import type { IPlainCardProps } from "@fluentui/react"
import { DirectionalHint, HoverCard, HoverCardType, Slider, Stack } from "@fluentui/react"
import throttle from "lodash/throttle"
import React from "react"

import { VOLUME_HIGH_OUTLINE_ICON_NAME } from "../../../../../components/Icon/volume-high-outline.generated"
import { VOLUME_LOW_OUTLINE_ICON_NAME } from "../../../../../components/Icon/volume-low-outline.generated"
import { VOLUME_MEDIUM_OUTLINE_ICON_NAME } from "../../../../../components/Icon/volume-medium-outline.generated"
import { VOLUME_MUTE_OUTLINE_ICON_NAME } from "../../../../../components/Icon/volume-mute-outline.generated"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { useAppStore } from "../../../../../modules/App"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useIsPlayerLoaded } from "../../hooks/useIsPlayerLoaded"
import { CourseClassPlayerButton } from "../CourseClassPlayerButton"
import { useCourseClassPlayerVolumeButtonStyles } from "./useCourseClassPlayerVolumeButtonStyles"

export type CourseClassPlayerVolumeButtonProps = {
	children?: undefined
	className?: string
}

const CourseClassPlayerVolumeButtonComponent: React.FC<CourseClassPlayerVolumeButtonProps> = ({ className }) => {
	const styles = useCourseClassPlayerVolumeButtonStyles({
		className,
	})
	const appStore = useAppStore()
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const isPlayerLoaded = useIsPlayerLoaded()

	const { isFullscreen, volume } = useObservableStates(courseClassPlayerStore, ["isFullscreen", "volume"])

	const handleRenderPlainCard = React.useCallback(() => {
		const handleChange = (v: number) => {
			courseClassPlayerStore.setVolume(v / 100)
		}

		return (
			<Stack className={styles.sliderWrapper} horizontal>
				<Slider
					className={styles.slider}
					vertical
					min={0}
					max={100}
					value={Math.floor(volume * 100)}
					onChange={handleChange}
				/>
			</Stack>
		)
	}, [styles, volume])

	const plainCardProps: IPlainCardProps = React.useMemo(
		() => ({
			onRenderPlainCard: handleRenderPlainCard,
			directionalHint: DirectionalHint.topCenter,
			calloutProps: {
				layerProps: {
					hostId: isFullscreen ? "course-class-player-controls" : undefined,
				},
			},
			firstFocus: false,
		}),
		[isFullscreen, handleRenderPlainCard]
	)

	const [previousVolume, setPreviousVolume] = React.useState(0)
	const handleClick = React.useCallback(
		(e) => {
			const volume = courseClassPlayerStore.volume.getValue()
			if (appStore.inputType.getValue() !== "POINTER") {
				return
			}

			e?.preventDefault()
			if (volume === 0) {
				if (previousVolume !== 0) {
					courseClassPlayerStore.setVolume(previousVolume)
					setPreviousVolume(0)
				}
			} else {
				courseClassPlayerStore.setVolume(0)
				setPreviousVolume(volume)
			}
		},
		[previousVolume]
	)

	React.useEffect(() => {
		const throttleSetPreviousVolume = throttle(setPreviousVolume, 10)
		const subscription = courseClassPlayerStore.volume.subscribe((newVolume) => {
			if (newVolume !== 0) {
				throttleSetPreviousVolume(newVolume)
			}
		})
		return () => subscription.unsubscribe()
	}, [])

	return (
		<>
			<HoverCard
				className={styles.hoverCard}
				hidden={!isPlayerLoaded}
				plainCardProps={plainCardProps}
				instantOpenOnClick={true}
				type={HoverCardType.plain}
				cardOpenDelay={100}
				onCardVisible={() => courseClassPlayerStore.blockShowControls("controls-volume")}
				onCardHide={() => courseClassPlayerStore.unblockShowControls("controls-volume")}
			>
				<CourseClassPlayerButton
					iconName={
						volume === 0
							? VOLUME_MUTE_OUTLINE_ICON_NAME
							: (volume ?? 1) < 0.4
							? VOLUME_LOW_OUTLINE_ICON_NAME
							: (volume ?? 1) < 0.75
							? VOLUME_MEDIUM_OUTLINE_ICON_NAME
							: VOLUME_HIGH_OUTLINE_ICON_NAME
					}
					buttonProps={{ onClick: handleClick, disabled: !isPlayerLoaded }}
				/>
			</HoverCard>
		</>
	)
}

export const CourseClassPlayerVolumeButton = React.memo(CourseClassPlayerVolumeButtonComponent)
