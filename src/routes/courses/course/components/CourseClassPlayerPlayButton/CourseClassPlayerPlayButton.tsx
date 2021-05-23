import React from "react"

import { PAUSE_ICON_NAME } from "../../../../../components/Icon/Pause.icon"
import { PLAY_ICON_NAME } from "../../../../../components/Icon/Play.icon"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import type { CourseClassPlayerButtonProps } from "../CourseClassPlayerButton"
import { CourseClassPlayerButton } from "../CourseClassPlayerButton"

export type CourseClassPlayerPlayButtonProps = {
	children?: undefined
}

const CourseClassPlayerPlayButtonComponent: React.FC<CourseClassPlayerPlayButtonProps> = ({}) => {
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const { paused } = useReactiveVars(courseClassPlayerStore, ["paused"])

	const buttonProps = React.useMemo<CourseClassPlayerButtonProps["buttonProps"]>(
		() => ({
			onClick: (e) => {
				if (e?.defaultPrevented) {
					return
				}

				e?.preventDefault()
				courseClassPlayerStore.togglePlay()
			},
		}),
		[]
	)

	return <CourseClassPlayerButton iconName={paused ? PLAY_ICON_NAME : PAUSE_ICON_NAME} buttonProps={buttonProps} />
}

export const CourseClassPlayerPlayButton = React.memo(CourseClassPlayerPlayButtonComponent)
