import React from "react"

import { SQUARE_OUTLINE_ICON_NAME } from "../../../../../components/Icon/square-outline.generated"
import { TABLET_LANDSCAPE_OUTLINE_ICON_NAME } from "../../../../../components/Icon/tablet-landscape-outline.generated"
import { useCourseClassPlayerStore } from "../../../../../courseClassPlayer"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import type { CourseClassPlayerButtonProps } from "../CourseClassPlayerButton"
import { CourseClassPlayerButton } from "../CourseClassPlayerButton"

export type CourseClassPlayerPinCourseClassListButtonProps = {
	children?: undefined
}

const CourseClassPlayerPinCourseClassListButtonComponent: React.FC<
	CourseClassPlayerPinCourseClassListButtonProps
> = () => {
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const { pinCourseClassList } = useObservableStates(courseClassPlayerStore, ["pinCourseClassList"])

	const buttonProps = React.useMemo<CourseClassPlayerButtonProps["buttonProps"]>(
		() => ({
			title: pinCourseClassList ? "Ocultar barra lateral" : "Mostrar barra lateral",
			onClick: () => courseClassPlayerStore.pinCourseClassList.next(!pinCourseClassList),
		}),
		[pinCourseClassList]
	)

	return (
		<CourseClassPlayerButton
			iconName={pinCourseClassList ? TABLET_LANDSCAPE_OUTLINE_ICON_NAME : SQUARE_OUTLINE_ICON_NAME}
			buttonProps={buttonProps}
		/>
	)
}

export const CourseClassPlayerPinCourseClassListButton = React.memo(CourseClassPlayerPinCourseClassListButtonComponent)
