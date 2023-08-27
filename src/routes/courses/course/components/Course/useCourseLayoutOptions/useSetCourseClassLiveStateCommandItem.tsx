import type { ICommandBarItemProps } from "@fluentui/react"
import type { OperationResult } from "urql"

import { ADD_OUTLINE_ICON_NAME } from "../../../../../../components/Icon/add-outline.generated"
import { CHEVRON_FORWARD_OUTLINE_ICON_NAME } from "../../../../../../components/Icon/chevron-forward-outline.generated"
import type { useCourseStyles } from "../useCourseStyles"
import type { CourseClassListsQuery } from "./useCourseLayoutOptions.urqlGraphql.generated"

export type UseSetCourseClassLiveStateCommandItemOptions = {
	styles: ReturnType<typeof useCourseStyles>
	courseClassListsResult: OperationResult<CourseClassListsQuery>
	onShowCreateCourseClassForm: (courseClassListCode: string) => void
}

export function useSetCourseClassLiveStateCommandItem({
	courseClassListsResult,
	styles,
	onShowCreateCourseClassForm,
}: UseSetCourseClassLiveStateCommandItemOptions): ICommandBarItemProps | null {
	const courseClassLists =
		courseClassListsResult.data?.courseByCode.__typename === "Course" &&
		courseClassListsResult.data?.courseByCode.editions
			.map((edition) => {
				return edition.courseClassLists
			})
			.flat()

	const text = courseClassLists && courseClassLists.length === 1 ? "Crear clase" : "Crear clase en..."
	const disabledMessage =
		courseClassLists && courseClassLists.length > 0 ? undefined : "El curso aún no tiene ninguna lista."
	const options: ICommandBarItemProps = {
		key: "create_course_class",
		title: disabledMessage || text,
		text: text,
		disabled: !!disabledMessage,
		iconProps: {
			iconName: ADD_OUTLINE_ICON_NAME,
		},
		className: styles.commandBarOverflowItemButton,
	}

	if (courseClassLists && courseClassLists.length !== 1) {
		options.submenuIconProps = {
			iconName: CHEVRON_FORWARD_OUTLINE_ICON_NAME,
			styles: {
				root: {
					fontSize: 16,
					height: "auto",
				},
			},
		}
		options.subMenuProps = {
			className: styles.commandBarOverflowItemButton,
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
		}
	}

	if (courseClassLists && courseClassLists.length === 1) {
		options.onClick = () => {
			onShowCreateCourseClassForm(courseClassLists[0].code)
		}
	}

	return options
}
