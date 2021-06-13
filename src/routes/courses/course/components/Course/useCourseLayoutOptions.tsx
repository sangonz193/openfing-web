import "../../../../../components/Icon/More.icon"

import type { QueryResult } from "@apollo/client"
import { CommandBar, Link } from "@fluentui/react"
import React from "react"

import { ADD_ICON_NAME } from "../../../../../components/Icon/Add.icon"
import { OPEN_ICON_NAME } from "../../../../../components/Icon/Open.icon"
import { useLayoutOptions } from "../../../../../components/Layout/useLayoutOptions"
import { useLocalLinkProps } from "../../../../../hooks/useLocalLinkProps"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useAuthStore } from "../../../../../modules/Auth"
import { useHistory } from "../../../../../modules/Navigation/useHistory"
import type { CourseClassListByCodeQuery } from "./Course.graphql.generated"
import type { useCourseStyles } from "./useCourseStyles"
import { useCreateCourseClassListHeaderTitleHack } from "./useCreateCourseClassListHeaderTitleHack"

export type UseCourseLayoutOptionsOptions = {
	courseClassListCode: string
	courseEva: string | undefined | null
	courseName: string | undefined
	courseClassListByCodeQueryResult: QueryResult<CourseClassListByCodeQuery>
	styles: ReturnType<typeof useCourseStyles>
	onShowCreateCourseClassListForm: () => void
}

export function useCourseLayoutOptions({
	courseClassListByCodeQueryResult,
	courseClassListCode,
	courseEva,
	courseName,
	styles,
	onShowCreateCourseClassListForm,
}: UseCourseLayoutOptionsOptions) {
	const history = useHistory()
	const { courseClassListByCode } = courseClassListByCodeQueryResult.data ?? {}
	const { headerTitle, headerTitleOverride } = useCreateCourseClassListHeaderTitleHack(
		!courseClassListByCodeQueryResult.loading && !courseName ? "Oops" : courseName ? courseName : "",
		courseClassListCode,
		courseClassListByCode
	)

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
							{
								key: "create_course_class_list",
								title: "Crear lista",
								text: "Crear lista",
								iconProps: {
									iconName: ADD_ICON_NAME,
								},
								className: styles.commandBarOverflowItemButton,
								onClick: onShowCreateCourseClassListForm,
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
