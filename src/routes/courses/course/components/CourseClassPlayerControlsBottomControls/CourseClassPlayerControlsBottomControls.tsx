import React from "react"
import { useMediaQuery } from "react-responsive"

import { useAppStore } from "../../../../../app"
import { RETURN_UP_BACK_OUTLINE_ICON_NAME } from "../../../../../components/Icon/return-up-back-outline.generated"
import { RETURN_UP_FORWARD_OUTLINE_ICON_NAME } from "../../../../../components/Icon/return-up-forward-outline.generated"
import { useCourseClassPlayerStore } from "../../../../../courseClassPlayer"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { Breakpoint } from "../../../../../styles/Breakpoint"
import { useIsPlayerLoaded } from "../../hooks/useIsPlayerLoaded"
import { CourseClassPlayerButton } from "../CourseClassPlayerButton"
import { CourseClassPlayerFullscreenButton } from "../CourseClassPlayerFullscreenButton"
import { CourseClassPlayerPinCourseClassListButton } from "../CourseClassPlayerPinCourseClassListButton"
import { CourseClassPlayerPlaybackRateButton } from "../CourseClassPlayerPlaybackRateButton"
import { CourseClassPlayerPlayButton } from "../CourseClassPlayerPlayButton"
import { CourseClassPlayerShowChaptersButton } from "../CourseClassPlayerShowChaptersButton"
import { CourseClassPlayerTrack } from "../CourseClassPlayerTrack"
import { CourseClassPlayerVolumeButton } from "../CourseClassPlayerVolumeButton"
import { useCourseClassPlayerControlsBottomControlsStyles } from "./useCourseClassPlayerControlsBottomControlsStyles"

export type CourseClassPlayerControlsBottomControlsProps = {
	children?: undefined
	className?: string
}

const CourseClassPlayerControlsBottomControlsComponent: React.FC<CourseClassPlayerControlsBottomControlsProps> = ({
	className,
}) => {
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const { showControls, chapterTextTracks } = useObservableStates(courseClassPlayerStore, [
		"showControls",
		"chapterTextTracks",
	])

	const [wasVisible, setWasVisible] = React.useState(showControls)

	React.useEffect(() => {
		if (showControls) {
			setWasVisible(true)
		}
	}, [showControls])

	const appStore = useAppStore()
	const { inputType } = useObservableStates(appStore, ["inputType"])

	const handleClick = React.useCallback((e: React.MouseEvent) => {
		if (e.defaultPrevented) {
			return
		}

		e.preventDefault()
		courseClassPlayerStore.showControlsFor("bottom-controls", 1500)
	}, [])

	const blockControlsId = "bottom-controls-hover"
	const handleMouseEnter = React.useCallback(() => courseClassPlayerStore.blockShowControls(blockControlsId), [])
	const handleMouseLeave = React.useCallback(() => courseClassPlayerStore.unblockShowControls(blockControlsId), [])

	const handleBackClick = React.useCallback(
		() => courseClassPlayerStore.setCurrentTime((courseClassPlayerStore.currentTime.getValue() || 0) - 10),
		[]
	)
	const handleForwardClick = React.useCallback(
		() => courseClassPlayerStore.setCurrentTime((courseClassPlayerStore.currentTime.getValue() || 0) + 10),
		[]
	)

	const isSM = useMediaQuery({ minWidth: Breakpoint.sm })
	const isPlayerLoaded = useIsPlayerLoaded()
	const styles = useCourseClassPlayerControlsBottomControlsStyles({
		className,
		visible: (wasVisible && showControls) || !isPlayerLoaded,
	})

	return (
		<div
			className={styles.wrapper}
			onClick={handleClick}
			onMouseEnter={inputType === "POINTER" ? handleMouseEnter : undefined}
			onMouseLeave={inputType === "POINTER" ? handleMouseLeave : undefined}
			onMouseOut={inputType === "POINTER" ? handleMouseLeave : undefined}
		>
			<CourseClassPlayerTrack />

			<div className={styles.buttonsContainer}>
				<CourseClassPlayerPlayButton />

				<CourseClassPlayerVolumeButton />

				<CourseClassPlayerButton
					className={styles.returnButton}
					iconName={RETURN_UP_BACK_OUTLINE_ICON_NAME}
					text="10"
					buttonProps={{ onClick: handleBackClick, disabled: !isPlayerLoaded }}
				/>

				<CourseClassPlayerButton
					className={styles.returnButton}
					iconName={RETURN_UP_FORWARD_OUTLINE_ICON_NAME}
					text="10"
					buttonProps={{ onClick: handleForwardClick, disabled: !isPlayerLoaded }}
				/>

				<div style={{ flex: 1 }} />

				{chapterTextTracks.length > 0 && <CourseClassPlayerShowChaptersButton />}

				<CourseClassPlayerPlaybackRateButton />

				{isSM && <CourseClassPlayerPinCourseClassListButton />}

				<CourseClassPlayerFullscreenButton />
			</div>
		</div>
	)
}

export const CourseClassPlayerControlsBottomControls = React.memo(CourseClassPlayerControlsBottomControlsComponent)
