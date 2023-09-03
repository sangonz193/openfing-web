import { CommandBar, CommandBarButton } from "@fluentui/react"
import React, { useCallback, useEffect } from "react"
import { Link } from "react-router-dom"
import type { UseQueryState } from "urql"

import { useAuthStore } from "../../../../../../auth"
import { openLink } from "../../../../../../browserAPI/openLink"
import { ADD_OUTLINE_ICON_NAME } from "../../../../../../components/Icon/add-outline.generated"
import { registerCancelIcon } from "../../../../../../components/Icon/cancel"
import { LIST_OUTLINE_ICON_NAME } from "../../../../../../components/Icon/list-outline.generated"
import { registerMoreIcon } from "../../../../../../components/Icon/more"
import { OPEN_OUTLINE_ICON_NAME } from "../../../../../../components/Icon/open-outline.generated"
import { PENCIL_OUTLINE_ICON_NAME } from "../../../../../../components/Icon/pencil-outline.generated"
import { RADIO_OUTLINE_ICON_NAME } from "../../../../../../components/Icon/radio-outline.generated"
import { useLayoutOptions } from "../../../../../../components/Layout/useLayoutOptions"
import { useComponentWithProps } from "../../../../../../hooks/useComponentWithProps"
import { useObservableStates } from "../../../../../../hooks/useObservableStates"
import type { CourseClassListByCodeQuery } from "../Course.urqlGraphql.generated"
import type { useCourseStyles } from "../useCourseStyles"
import type { CourseClassListsQueryVariables } from "./useCourseLayoutOptions.urqlGraphql.generated"
import { useCourseClassListsQuery } from "./useCourseLayoutOptions.urqlGraphql.generated"
import { useCreateCourseClassCommandItem } from "./useCreateCourseClassCommandItem"

registerMoreIcon()
registerCancelIcon()

export type UseCourseLayoutOptionsOptions = {
	courseClassId: string | undefined
	courseClassListByCodeQueryResult: UseQueryState<CourseClassListByCodeQuery>
	courseClassListCode: string
	courseCode: string | undefined
	courseEva: string | undefined | null
	courseName: string | undefined
	styles: ReturnType<typeof useCourseStyles>
	onShowCreateCourseClassListForm: () => void
	onEditCourse: () => void
	onShowCreateCourseClassForm: (courseClassListCode: string) => void
	onEditLiveState: () => void
	onEditChapters: () => void
}

export function useCourseLayoutOptions({
	courseClassId,
	courseClassListByCodeQueryResult,
	courseClassListCode,
	courseCode,
	courseEva,
	courseName,
	styles,
	onShowCreateCourseClassListForm,
	onEditCourse,
	onShowCreateCourseClassForm,
	onEditLiveState,
	onEditChapters,
}: UseCourseLayoutOptionsOptions) {
	const variables: CourseClassListsQueryVariables | undefined =
		courseCode || courseClassListCode ? { code: courseCode || courseClassListCode } : undefined
	const [courseClassListsResult] = useCourseClassListsQuery({
		variables: variables,
		pause: !variables,
	})

	const courseByCode = courseClassListsResult.data?.courseByCode
	const getHeaderTitle = useCallback(() => {
		if (courseName) {
			return {
				headerTitle: courseName,
				isCourse: false,
			}
		}

		if (courseByCode?.__typename === "Course") {
			return {
				headerTitle: courseByCode.name,
				isCourse: true,
			}
		}

		if (
			courseByCode?.__typename === "NotFoundError" ||
			courseClassListByCodeQueryResult.data?.courseClassListByCode?.__typename === "NotFoundError"
		) {
			return {
				headerTitle: "Oops",
				isCourse: false,
			}
		}

		return undefined
	}, [courseName, courseByCode?.__typename === "Course" ? courseByCode.name : courseByCode?.__typename])

	const [headerOptions, setHeaderOptions] = React.useState({ headerTitle: "", isCourse: false })

	useEffect(() => {
		setHeaderOptions(getHeaderTitle() || headerOptions)
	}, [getHeaderTitle])

	const handleOpenEva = React.useCallback(() => {
		if (!courseEva) {
			return
		}

		openLink({ link: courseEva, newWindow: true })
	}, [courseEva])

	const { grant } = useObservableStates(useAuthStore(), ["grant"]) // TODO: get isAdmin condition
	const createCourseClassCommandItem = useCreateCourseClassCommandItem({
		courseClassListsResult,
		styles,
		onShowCreateCourseClassForm,
	})

	const HeaderRight = useComponentWithProps(
		({ courseClassId, courseEva, isCourse, grant, styles, onEditLiveState, onShowCreateCourseClassListForm }) => {
			if (!grant && !isCourse) {
				return !!courseEva ? (
					<Link to={courseEva} className={styles.headerLink} target="_blank" rel="noopener noreferrer">
						EVA
					</Link>
				) : null
			}

			if (!grant) {
				return null
			}

			return (
				<div style={{ height: "100%" }}>
					<CommandBar
						className={styles.commandBar}
						items={[]}
						overflowButtonAs={(props) => (
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							<CommandBarButton {...props} menuProps={{ ...props.menuProps!, isBeakVisible: false }} />
						)}
						overflowItems={[
							createCourseClassCommandItem,
							{
								key: "create_course_class_list",
								title: "Crear lista de clases",
								text: "Crear lista de clases",
								iconProps: {
									iconName: ADD_OUTLINE_ICON_NAME,
								},
								className: styles.commandBarOverflowItemButton,
								onClick: () => onShowCreateCourseClassListForm(),
							},
							{
								key: "edit_course",
								title: "Editar curso",
								text: "Editar curso",
								iconProps: {
									iconName: PENCIL_OUTLINE_ICON_NAME,
								},
								className: styles.commandBarOverflowItemButton,
								onClick: onEditCourse,
							},
							...(courseClassId
								? [
										{
											key: "edit_live_state",
											title: "Editar estado en vivo",
											text: "Editar estado en vivo",
											iconProps: {
												iconName: RADIO_OUTLINE_ICON_NAME,
											},
											className: styles.commandBarOverflowItemButton,
											onClick: () => onEditLiveState(),
										},
								  ]
								: []),
							...(courseClassId
								? [
										{
											key: "edit_chapter_cues",
											title: "Editar capítulos",
											text: "Editar capítulos",
											iconProps: {
												iconName: LIST_OUTLINE_ICON_NAME,
											},
											className: styles.commandBarOverflowItemButton,
											onClick: () => onEditChapters(),
										},
								  ]
								: []),
							{
								key: "open_eva",
								title: "Eva",
								text: "Abrir eva",
								iconProps: {
									iconName: OPEN_OUTLINE_ICON_NAME,
								},
								className: styles.commandBarOverflowItemButton,
								onClick: handleOpenEva,
							},
						]}
					/>
				</div>
			)
		},
		{
			courseClassId,
			courseEva,
			isCourse: headerOptions.isCourse,
			grant,
			styles,
			onShowCreateCourseClassListForm,
			onEditLiveState,
		}
	)
	useLayoutOptions({
		headerTitle: headerOptions.headerTitle,
		headerRight: HeaderRight,
	})
}
