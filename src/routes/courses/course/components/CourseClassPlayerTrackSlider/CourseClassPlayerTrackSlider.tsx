import type { Point } from "@fluentui/react"
import { Stack } from "@fluentui/react"
import { Callout, DirectionalHint, Slider, Text } from "@fluentui/react"
import throttle from "lodash/throttle"
import React from "react"

import { secondsToString } from "../../../../../_utils/secondsToString"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useIsPlayerLoaded } from "../../hooks/useIsPlayerLoaded"
import { useCourseClassPlayerTrackSliderStyles } from "./useCourseClassPlayerTrackSliderStyles"

export type CourseClassPlayerTrackSliderProps = {
	children?: undefined
	className?: string
}

const CourseClassPlayerTrackSliderComponent: React.FC<CourseClassPlayerTrackSliderProps> = ({ className }) => {
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const { duration, currentTime, isFullscreen } = useObservableStates(courseClassPlayerStore, [
		"duration",
		"currentTime",
		"isFullscreen",
	])

	const [blockTooltipIds, setBlockTooltipIds] = React.useState<string[]>([])
	const backgroundTrackRef = React.useRef<HTMLDivElement>(null)

	const blockTooltip = (id: string) => {
		setBlockTooltipIds((e) => [...e.filter((i) => i !== id), id])
	}
	const unblockTooltip = (id: string) => {
		setBlockTooltipIds((e) => [...e.filter((i) => i !== id)])
	}

	const [sliderValue, setSliderValueSource] = React.useState<{ type: "store" } | { type: "local"; value: number }>({
		type: "store",
	})
	const [tooltipPositionData, setTooltipPositionData] = React.useState<
		{ point: Required<Pick<Point, "left" | "top">>; bounds: { left: number; width: number } } | false
	>()

	const handleChange = React.useCallback((value: number) => {
		blockTooltip("drag")
		if (!backgroundTrackRef.current) {
			return
		}

		const wrapperBounds = backgroundTrackRef.current.getBoundingClientRect()
		setTooltipPositionData({
			point: {
				top: wrapperBounds.top,
				left: wrapperBounds.left + (value * wrapperBounds.width) / courseClassPlayerStore.duration.getValue(),
			},
			bounds: {
				left: wrapperBounds.left,
				width: wrapperBounds.width,
			},
		})
		setSliderValueSource({ type: "local", value })
	}, [])
	const [throttleHandleChange] = React.useState(() => throttle(handleChange, 200))

	const sliderValueRef = React.useRef(sliderValue)
	sliderValueRef.current = sliderValue

	const handleChanged = React.useCallback(() => {
		const sliderValue = sliderValueRef.current
		setTimeout(() => unblockTooltip("drag"), 300)

		if (sliderValue.type === "local") {
			courseClassPlayerStore.setCurrentTime(sliderValue.value)
		}

		throttleHandleChange.cancel()
		setSliderValueSource({ type: "store" })
	}, [sliderValue])

	const handleTooltipPositionFromEvent = React.useCallback((e: { clientX: number }) => {
		if (!backgroundTrackRef.current) {
			return
		}

		const wrapperBounds = backgroundTrackRef.current.getBoundingClientRect()
		setTooltipPositionData({
			point: {
				top: wrapperBounds.top,
				left: e.clientX,
			},
			bounds: {
				left: wrapperBounds.left,
				width: wrapperBounds.width,
			},
		})
	}, [])
	const [throttleHandleTooltipPositionFromEvent] = React.useState(() => throttle(handleTooltipPositionFromEvent, 50))

	const [showTooltip, setShowTooltip] = React.useState(false)
	const hideTooltipTimeoutRef = React.useRef<NodeJS.Timeout>()
	React.useEffect(() => {
		const shouldShowTooltip = !!blockTooltipIds.length

		if (shouldShowTooltip) {
			if (hideTooltipTimeoutRef.current) {
				clearTimeout(hideTooltipTimeoutRef.current)
				hideTooltipTimeoutRef.current = undefined
			}

			if (!showTooltip) {
				setShowTooltip(true)
			}
		} else if (showTooltip !== shouldShowTooltip) {
			hideTooltipTimeoutRef.current = setTimeout(() => setShowTooltip(shouldShowTooltip), 300)
		}
	}, [blockTooltipIds])

	React.useEffect(() => {
		if (showTooltip) {
			courseClassPlayerStore.blockShowControls("track")
		} else {
			courseClassPlayerStore.unblockShowControls("track")
		}
	}, [showTooltip, tooltipPositionData])

	const tooltipTimePosition =
		showTooltip &&
		tooltipPositionData &&
		Math.max(
			0,
			Math.min(
				((tooltipPositionData.point.left - tooltipPositionData.bounds.left) * duration) /
					(tooltipPositionData.bounds.width || 1),
				duration
			)
		)

	const handleSliderButtonMouseEnter = React.useCallback<React.MouseEventHandler>((e) => {
		blockTooltip("hover")
		throttleHandleTooltipPositionFromEvent.cancel()
		handleTooltipPositionFromEvent({ clientX: e.clientX })
	}, [])

	const handleSliderButtonMouseMove = React.useCallback<React.MouseEventHandler>((e) => {
		throttleHandleTooltipPositionFromEvent({ clientX: e.clientX })
	}, [])

	const handleSliderButtonMouseLeave = React.useCallback<React.MouseEventHandler>(() => {
		throttleHandleTooltipPositionFromEvent.cancel()
		setTimeout(() => unblockTooltip("hover"))
	}, [])

	const handleSliderButtonFocus = React.useCallback(() => {
		courseClassPlayerStore.htmlVideoWrapperElement.getValue()?.focus()
	}, [])

	const isPlayerLoaded = useIsPlayerLoaded()

	const styles = useCourseClassPlayerTrackSliderStyles({
		className,
		sliderDisabled: !useIsPlayerLoaded(),
	})

	return (
		<Stack className={styles.wrapper}>
			{tooltipPositionData && typeof tooltipTimePosition === "number" && (
				<Callout
					target={tooltipPositionData.point}
					directionalHint={DirectionalHint.topCenter}
					className={styles.timeSliderCallout}
					isBeakVisible={false}
					gapSpace={20}
					layerProps={{ hostId: isFullscreen ? "course-class-player-controls" : undefined }}
				>
					<Text className={styles.timeSliderCalloutText}>{secondsToString(tooltipTimePosition)}</Text>
				</Callout>
			)}

			<div ref={backgroundTrackRef} className={styles.sliderBackgroundTrack}>
				<div
					className={styles.sliderBufferedTrack}
					style={{
						width: `${
							(tooltipTimePosition && sliderValue.type === "store"
								? (tooltipTimePosition * 100) / (duration || 1)
								: courseClassPlayerStore.loadedPercentage.getValue()) || 0
						}%`,
					}}
				/>
			</div>

			<Slider
				className={styles.slider}
				showValue={false}
				min={0}
				disabled={!isPlayerLoaded}
				max={duration || undefined}
				value={sliderValue.type === "local" ? sliderValue.value : currentTime}
				onChange={throttleHandleChange}
				onChanged={handleChanged}
				buttonProps={
					isPlayerLoaded
						? {
								onMouseEnter: handleSliderButtonMouseEnter,
								onMouseMove: handleSliderButtonMouseMove,
								onMouseLeave: handleSliderButtonMouseLeave,
								onFocus: handleSliderButtonFocus,
						  }
						: undefined
				}
			/>
		</Stack>
	)
}

export const CourseClassPlayerTrackSlider = React.memo(CourseClassPlayerTrackSliderComponent)
