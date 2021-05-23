import React from "react"

import { CONTRACT_TWO_ARROWS_ICON_NAME } from "../../../../../components/Icon/ContractTwoArrows.icon"
import { RESIZE_ICON_NAME } from "../../../../../components/Icon/Resize.icon"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { CourseClassPlayerButtonProps } from "../CourseClassPlayerButton"
import { CourseClassPlayerButton } from "../CourseClassPlayerButton"

export type CourseClassPlayerFullscreenButtonProps = {
	children?: undefined
}

const CourseClassPlayerFullscreenButtonComponent: React.FC<CourseClassPlayerFullscreenButtonProps> = ({}) => {
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const { isFullscreen } = useReactiveVars(courseClassPlayerStore, ["isFullscreen"])

	const buttonProps = React.useMemo<CourseClassPlayerButtonProps["buttonProps"]>(
		() => ({
			onClick: (e) => {
				if (e?.defaultPrevented) {
					return
				}

				e?.preventDefault()
				courseClassPlayerStore.toggleFullscreen()
			},
		}),
		[]
	)

	return (
		<CourseClassPlayerButton
			iconName={isFullscreen ? CONTRACT_TWO_ARROWS_ICON_NAME : RESIZE_ICON_NAME}
			buttonProps={buttonProps}
		/>
	)
}

export const CourseClassPlayerFullscreenButton = React.memo(CourseClassPlayerFullscreenButtonComponent)
