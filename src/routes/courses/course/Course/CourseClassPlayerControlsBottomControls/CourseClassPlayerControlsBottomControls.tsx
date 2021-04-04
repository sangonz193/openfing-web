import { useReactiveVar } from "@apollo/client"
import React from "react"
import { useMediaQuery } from "react-responsive"

import { RETURN_UP_BACK_ICON_NAME } from "../../../../../components/Icon/ReturnUpBack.icon"
import { RETURN_UP_FORWARD_ICON_NAME } from "../../../../../components/Icon/ReturnUpForward.icon"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useAppStore } from "../../../../../modules/App"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { Breakpoint } from "../../../../../styles/Breakpoint"
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
	const { showControls, chapterTextTracks } = useReactiveVars(courseClassPlayerStore, [
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
	const inputType = useReactiveVar(appStore.inputType)

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
		() => courseClassPlayerStore.setCurrentTime((courseClassPlayerStore.currentTime() || 0) - 10),
		[]
	)
	const handleForwardClick = React.useCallback(
		() => courseClassPlayerStore.setCurrentTime((courseClassPlayerStore.currentTime() || 0) + 10),
		[]
	)

	const isSM = useMediaQuery({ minWidth: Breakpoint.sm })
	const styles = useCourseClassPlayerControlsBottomControlsStyles({
		className,
		visible: wasVisible && showControls,
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
					iconName={RETURN_UP_BACK_ICON_NAME}
					text="10"
					buttonProps={{ onClick: handleBackClick }}
				/>

				<CourseClassPlayerButton
					className={styles.returnButton}
					iconName={RETURN_UP_FORWARD_ICON_NAME}
					text="10"
					buttonProps={{ onClick: handleForwardClick }}
				/>

				<div style={{ flex: 1 }} />

				{chapterTextTracks.length > -1 && <CourseClassPlayerShowChaptersButton />}

				<CourseClassPlayerPlaybackRateButton />

				{isSM && <CourseClassPlayerPinCourseClassListButton />}

				<CourseClassPlayerFullscreenButton />
			</div>
		</div>
	)
}

export const CourseClassPlayerControlsBottomControls = React.memo(CourseClassPlayerControlsBottomControlsComponent)
