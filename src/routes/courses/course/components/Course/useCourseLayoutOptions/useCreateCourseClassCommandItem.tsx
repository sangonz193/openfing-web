import { ADD_ICON_NAME } from "../../../../../../components/Icon/Add.icon"
import { CHEVRON_RIGHT_ICON_NAME } from "../../../../../../components/Icon/ChevronRight.icon"
import type { useCourseStyles } from "../useCourseStyles"
import type { CourseClassListsQueryResult } from "./useCourseLayoutOptions.graphql.generated"

export type UseCreateCourseClassCommandItemOptions = {
	styles: ReturnType<typeof useCourseStyles>
	courseClassListsResult: CourseClassListsQueryResult
	onShowCreateCourseClassForm: (courseClassListCode: string) => void
}

export function useCreateCourseClassCommandItem({
	courseClassListsResult,
	styles,
	onShowCreateCourseClassForm,
}: UseCreateCourseClassCommandItemOptions) {
	const courseClassLists =
		courseClassListsResult.data?.courseByCode.__typename === "Course" &&
		courseClassListsResult.data?.courseByCode.editions
			.map((edition) => {
				return edition.courseClassLists
			})
			.flat()

	const disabledMessage =
		courseClassLists && courseClassLists.length > 0 ? undefined : "El curso aún no tiene ninguna lista."

	return {
		key: "create_course_class",
		title: !!disabledMessage ? disabledMessage : "Crear clase en...",
		text: "Crear clase en...",
		disabled: !!disabledMessage,
		iconProps: {
			iconName: ADD_ICON_NAME,
		},
		className: styles.commandBarOverflowItemButton,
		submenuIconProps: {
			iconName: CHEVRON_RIGHT_ICON_NAME,
			styles: {
				root: {
					fontSize: 16,
					height: "auto",
				},
			},
		},
		subMenuProps: {
			items: courseClassLists
				? courseClassLists.map((courseClassList) => {
						return {
							key: `create_course_class:${courseClassList.id}`,
							title: courseClassList.code,
							text: courseClassList.code,
							onClick: () => onShowCreateCourseClassForm(courseClassList.code),
						}
				  })
				: [],
		},
	}
}
