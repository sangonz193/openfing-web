import React from "react"

import { PAUSE_OUTLINE_ICON_NAME } from "../../../../../components/Icon/pause-outline.generated"
import { PLAY_OUTLINE_ICON_NAME } from "../../../../../components/Icon/play-outline.generated"
import { useCourseClassPlayerStore } from "../../../../../courseClassPlayer"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { useIsPlayerLoaded } from "../../hooks/useIsPlayerLoaded"
import type { CourseClassPlayerButtonProps } from "../CourseClassPlayerButton"
import { CourseClassPlayerButton } from "../CourseClassPlayerButton"

export type CourseClassPlayerPlayButtonProps = {
	children?: undefined
}

const CourseClassPlayerPlayButtonComponent: React.FC<CourseClassPlayerPlayButtonProps> = ({}) => {
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const { paused } = useObservableStates(courseClassPlayerStore, ["paused"])

	const isPlayerLoaded = useIsPlayerLoaded()
	const buttonProps = React.useMemo<CourseClassPlayerButtonProps["buttonProps"]>(
		() => ({
			disabled: !isPlayerLoaded,
			onClick: (e) => {
				if (e?.defaultPrevented) {
					return
				}

				e?.preventDefault()
				courseClassPlayerStore.togglePlay()
			},
		}),
		[isPlayerLoaded]
	)

	return (
		<CourseClassPlayerButton
			iconName={paused ? PLAY_OUTLINE_ICON_NAME : PAUSE_OUTLINE_ICON_NAME}
			buttonProps={buttonProps}
		/>
	)
}

export const CourseClassPlayerPlayButton = React.memo(CourseClassPlayerPlayButtonComponent)
