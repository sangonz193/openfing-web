import type { QueryResult } from "@apollo/client"
import { CommandBar, Link } from "@fluentui/react"
import React from "react"

import { ADD_ICON_NAME } from "../../../../../../components/Icon/Add.icon"
import {} from "../../../../../../components/Icon/More.icon"
import { OPEN_ICON_NAME } from "../../../../../../components/Icon/Open.icon"
import { useLayoutOptions } from "../../../../../../components/Layout/useLayoutOptions"
import { useLocalLinkProps } from "../../../../../../hooks/useLocalLinkProps"
import { useReactiveVars } from "../../../../../../hooks/useReactiveVars"
import { useAuthStore } from "../../../../../../modules/Auth"
import { useHistory } from "../../../../../../modules/Navigation/useHistory"
import type { CourseClassListByCodeQuery } from "../Course.graphql.generated"
import type { useCourseStyles } from "../useCourseStyles"
import { useCreateCourseClassListHeaderTitleHack } from "../useCreateCourseClassListHeaderTitleHack"
import type { CourseClassListsQueryVariables } from "./useCourseLayoutOptions.graphql.generated"
import { useCourseClassListsQuery } from "./useCourseLayoutOptions.graphql.generated"
import { useCreateCourseClassCommandItem } from "./useCreateCourseClassCommandItem"

export type UseCourseLayoutOptionsOptions = {
	courseClassListByCodeQueryResult: QueryResult<CourseClassListByCodeQuery>
	courseClassListCode: string
	courseCode: string | undefined
	courseEva: string | undefined | null
	courseName: string | undefined
	styles: ReturnType<typeof useCourseStyles>
	onShowCreateCourseClassListForm: () => void
	onShowCreateCourseClassForm: (courseClassListCode: string) => void
}

export function useCourseLayoutOptions({
	courseClassListByCodeQueryResult,
	courseClassListCode,
	courseCode,
	courseEva,
	courseName,
	styles,
	onShowCreateCourseClassListForm,
	onShowCreateCourseClassForm,
}: UseCourseLayoutOptionsOptions) {
	const history = useHistory()
	const { courseClassListByCode } = courseClassListByCodeQueryResult.data ?? {}
	const { headerTitle, headerTitleOverride } = useCreateCourseClassListHeaderTitleHack(
		!courseClassListByCodeQueryResult.loading && !courseName ? "Oops" : courseName ? courseName : "",
		courseClassListCode,
		courseClassListByCode
	)

	const variables: CourseClassListsQueryVariables | undefined = courseCode ? { code: courseCode } : undefined
	const courseClassListsResult = useCourseClassListsQuery({
		variables: variables,
		skip: !variables,
	})

	const evaLinkProps = useLocalLinkProps({
		href: courseEva ?? undefined,
		className: styles.headerLink,
	})

	const evaUrl = evaLinkProps.href
	const handleOpenEva = React.useCallback(() => {
		if (!evaUrl) {
			return
		}

		history.push(evaUrl)
	}, [evaUrl])

	const { secret } = useReactiveVars(useAuthStore(), ["secret"]) // TODO: get isAdmin condition
	const createCourseClassCommandItem = useCreateCourseClassCommandItem({
		courseClassListsResult,
		styles,
		onShowCreateCourseClassForm,
	})
	useLayoutOptions({
		headerTitle: headerTitle,
		headerRight: React.useMemo(() => {
			console.log(secret)
			if (!secret && !headerTitleOverride) {
				return !!evaUrl && <Link {...evaLinkProps}>EVA</Link>
			}

			if (!secret) {
				return null
			}

			return (
				<div style={{ height: "100%" }}>
					<CommandBar
						className={styles.commandBar}
						items={[]}
						overflowItems={[
							createCourseClassCommandItem,
							{
								key: "create_course_class_list",
								title: "Crear lista de clases",
								text: "Crear lista de clases",
								iconProps: {
									iconName: ADD_ICON_NAME,
								},
								className: styles.commandBarOverflowItemButton,
								onClick: () => onShowCreateCourseClassListForm(),
							},
							{
								key: "open_eva",
								title: "Eva",
								text: "Abrir eva",
								iconProps: {
									iconName: OPEN_ICON_NAME,
								},
								className: styles.commandBarOverflowItemButton,
								onClick: handleOpenEva,
							},
						]}
					/>
				</div>
			)
		}, [secret, headerTitleOverride, evaUrl, evaLinkProps, styles.commandBar, styles.commandBarOverflowItemButton]),
	})
}
