import React from "react"

import { LANDSCAPE_ICON_NAME } from "../../../../../components/Icon/Landscape.icon"
import { SQUARE_ICON_NAME } from "../../../../../components/Icon/Square.icon"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { CourseClassPlayerButton, CourseClassPlayerButtonProps } from "../CourseClassPlayerButton"

export type CourseClassPlayerPinCourseClassListButtonProps = {
	children?: undefined
}

const CourseClassPlayerPinCourseClassListButtonComponent: React.FC<CourseClassPlayerPinCourseClassListButtonProps> =
	() => {
		const courseClassPlayerStore = useCourseClassPlayerStore()
		const { pinCourseClassList } = useReactiveVars(courseClassPlayerStore, ["pinCourseClassList"])

		const buttonProps = React.useMemo<CourseClassPlayerButtonProps["buttonProps"]>(
			() => ({
				title: pinCourseClassList ? "Ocultar barra lateral" : "Mostrar barra lateral",
				onClick: () => courseClassPlayerStore.pinCourseClassList(!pinCourseClassList),
			}),
			[pinCourseClassList]
		)

		return (
			<CourseClassPlayerButton
				iconName={pinCourseClassList ? LANDSCAPE_ICON_NAME : SQUARE_ICON_NAME}
				buttonProps={buttonProps}
			/>
		)
	}

export const CourseClassPlayerPinCourseClassListButton = React.memo(CourseClassPlayerPinCourseClassListButtonComponent)
