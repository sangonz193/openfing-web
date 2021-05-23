import "../.../../../../../../components/Icon/More.icon"

import { CommandBar, Link, Panel } from "@fluentui/react"
import React from "react"
import { useMediaQuery } from "react-responsive"

import { Container } from "../../../../../components/Container"
import { ADD_ICON_NAME } from "../../../../../components/Icon/Add.icon"
import { useLayoutOptions } from "../../../../../components/Layout/useLayoutOptions"
import { useDocumentTitle } from "../../../../../hooks/useDocumentTitle"
import { useLocalLinkProps } from "../../../../../hooks/useLocalLinkProps"
import { useQueryParams } from "../../../../../hooks/useQueryParams"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useCourseSelectionStore } from "../../../../../modules/CourseSelection"
import { useHistory } from "../../../../../modules/Navigation/useHistory"
import { Breakpoint } from "../../../../../styles/Breakpoint"
import { CourseDetail } from "../CourseDetail"
import { CourseMaster } from "../CourseMaster"
import { CreateCourseClassListForm } from "../CreateCourseClassListForm/CreateCourseClassListForm"
import type { CourseClassListByCodeQueryVariables } from "./Course.graphql.generated"
import { useCourseClassListByCodeQuery } from "./Course.graphql.generated"
import { useCourseStyles } from "./useCourseStyles"
import { useCreateCourseClassListHeaderTitleHack } from "./useCreateCourseClassListHeaderTitleHack"

export type CourseProps = {
	children?: undefined
	className?: string
	courseClassListCode: string
	courseClassNumber: string | undefined
}

type CourseQueryParams = "t"

const CourseComponent: React.FC<CourseProps> = ({ className, courseClassListCode, courseClassNumber }) => {
	const history = useHistory()
	const queryParams = useQueryParams<CourseQueryParams>()
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const courseSelectionStore = useCourseSelectionStore()
	const { pinCourseClassList } = useReactiveVars(courseClassPlayerStore, ["pinCourseClassList"])

	const variables: CourseClassListByCodeQueryVariables | undefined = courseClassListCode
		? {
				code: courseClassListCode,
		  }
		: undefined
	const courseClassListByCodeQueryResult = useCourseClassListByCodeQuery({
		variables: variables,
		skip: !variables,
	})
	const course =
		courseClassListByCodeQueryResult.data?.courseClassListByCode?.__typename === "CourseClassList"
			? courseClassListByCodeQueryResult.data?.courseClassListByCode.courseEdition?.course
			: undefined

	const { courseClassListByCode } = courseClassListByCodeQueryResult.data ?? {}
	React.useEffect(() => {
		if (courseClassListByCode?.__typename === "CourseClassList") {
			courseSelectionStore.courseClassListByCodeWithId(courseClassListByCode)
			courseSelectionStore.courseClassListByCodeWithClasses(courseClassListByCode)
		}
	}, [courseClassListByCode])

	const courseName = course?.name
	useDocumentTitle(`${courseName || "Curso"} - OpenFING`)

	React.useEffect(() => {
		const tParamOrEmptyString = Array.isArray(queryParams.t) ? "" : queryParams.t
		courseClassPlayerStore.urlHash(queryParams.t ? "#t=" + tParamOrEmptyString : history.location.hash)
	}, [queryParams.t, history.location.hash])

	const isSM = useMediaQuery({ minWidth: Breakpoint.sm })
	const { headerTitle, headerTitleOverride } = useCreateCourseClassListHeaderTitleHack(
		!courseClassListByCodeQueryResult.loading && !course ? "Oops" : courseName ? courseName : "",
		courseClassListCode,
		courseClassListByCode
	)
	const showCourseDetail = (courseClassNumber && course) || isSM

	const styles = useCourseStyles({
		className,
	})

	const evaLinkProps = useLocalLinkProps({
		href: course?.eva ?? undefined,
		className: styles.headerLink,
	})

	const [showCreateCourseClassListForm, setShowCreateCourseClassListForm] = React.useState(false)

	const { secret } = { secret: undefined as undefined | string } // TODO: get isAdmin condition
	useLayoutOptions({
		headerTitle: headerTitle,
		headerRight: React.useMemo(() => {
			if (!headerTitleOverride) {
				return !!evaLinkProps.href && <Link {...evaLinkProps}>EVA</Link>
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
								onClick: () => {
									setShowCreateCourseClassListForm(true)
								},
							},
						]}
					/>
				</div>
			)
		}, [styles.headerLink, evaLinkProps, styles.commandBar, styles.commandBarOverflowItemButton]),
	})

	return (
		<>
			<Container className={styles.wrapper}>
				{(!courseClassNumber || pinCourseClassList) && (
					<CourseMaster key="master" className={styles.courseMaster} />
				)}

				{showCourseDetail && <CourseDetail key="detail" className={styles.courseDetails} />}
			</Container>

			<Panel
				headerText="Crear lista de clases"
				isOpen={showCreateCourseClassListForm}
				closeButtonAriaLabel="Cerrar"
				onDismiss={() => {
					// TODO: confirm
					setShowCreateCourseClassListForm(false)
				}}
			>
				{showCreateCourseClassListForm && (
					<CreateCourseClassListForm
						courseCode={courseClassListCode}
						courseId={courseClassListCode}
						onClose={() => {
							setShowCreateCourseClassListForm(false)
						}}
					/>
				)}
			</Panel>
		</>
	)
}

export const Course = React.memo(CourseComponent)
