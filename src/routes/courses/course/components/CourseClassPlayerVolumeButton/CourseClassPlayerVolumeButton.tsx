import { DirectionalHint, HoverCard, HoverCardType, IPlainCardProps, Slider, Stack } from "@fluentui/react"
import throttle from "lodash/throttle"
import React from "react"

import { listenVar } from "../../../../../_utils/listenVar"
import { VOLUME_HIGH_ICON_NAME } from "../../../../../components/Icon/VolumeHigh.icon"
import { VOLUME_LOW_ICON_NAME } from "../../../../../components/Icon/VolumeLow.icon"
import { VOLUME_MEDIUM_ICON_NAME } from "../../../../../components/Icon/VolumeMedium.icon"
import { VOLUME_MUTE_ICON_NAME } from "../../../../../components/Icon/VolumeMute.icon"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useAppStore } from "../../../../../modules/App"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
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

	const { isFullscreen, volume } = useReactiveVars(courseClassPlayerStore, ["isFullscreen", "volume"])

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
			const volume = courseClassPlayerStore.volume()
			if (appStore.inputType() !== "POINTER") {
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
		const listener = listenVar(courseClassPlayerStore.volume, (newVolume) => {
			if (newVolume !== 0) {
				throttleSetPreviousVolume(newVolume)
			}
		})
		return () => listener()
	}, [])

	return (
		<>
			<HoverCard
				className={styles.hoverCard}
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
							? VOLUME_MUTE_ICON_NAME
							: (volume ?? 1) < 0.4
							? VOLUME_LOW_ICON_NAME
							: (volume ?? 1) < 0.75
							? VOLUME_MEDIUM_ICON_NAME
							: VOLUME_HIGH_ICON_NAME
					}
					buttonProps={{ onClick: handleClick }}
				/>
			</HoverCard>
		</>
	)
}

export const CourseClassPlayerVolumeButton = React.memo(CourseClassPlayerVolumeButtonComponent)
