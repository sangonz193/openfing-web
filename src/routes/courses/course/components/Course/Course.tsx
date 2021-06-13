import "../.../../../../../../components/Icon/More.icon"

import { Panel } from "@fluentui/react"
import React from "react"
import { useMediaQuery } from "react-responsive"

import { Container } from "../../../../../components/Container"
import { useDocumentTitle } from "../../../../../hooks/useDocumentTitle"
import { useQueryParams } from "../../../../../hooks/useQueryParams"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useCourseSelectionStore } from "../../../../../modules/CourseSelection"
import { useHistory } from "../../../../../modules/Navigation/useHistory"
import { Breakpoint } from "../../../../../styles/Breakpoint"
import { CourseDetail } from "../CourseDetail"
import { CourseMaster } from "../CourseMaster"
import type { CourseClassListByCodeQueryVariables } from "./Course.graphql.generated"
import { useCourseClassListByCodeQuery } from "./Course.graphql.generated"
import { useCourseLayoutOptions } from "./useCourseLayoutOptions"
import { useCourseStyles } from "./useCourseStyles"

const CreateCourseClassForm = React.lazy(() =>
	import("../CreateCourseClassForm").then(({ CreateCourseClassForm }) => ({ default: CreateCourseClassForm }))
)

const CreateCourseClassListForm = React.lazy(() =>
	import("../CreateCourseClassListForm").then(({ CreateCourseClassListForm }) => ({
		default: CreateCourseClassListForm,
	}))
)

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
	const showCourseDetail = (courseClassNumber && course) || isSM

	const styles = useCourseStyles({
		className,
	})

	const [showCreateCourseClassList, setShowCreateCourseClassList] = React.useState(false)
	const [createCourseClassCourseClassListCode, setCreateCourseClassCourseClassListCode] = React.useState<string>()
	useCourseLayoutOptions({
		courseClassListCode: courseClassListCode,
		onShowCreateCourseClassListForm: React.useCallback(() => setShowCreateCourseClassList(true), []),
		onShowCreateCourseClassForm: setCreateCourseClassCourseClassListCode,
		styles: styles,
		courseClassListByCodeQueryResult,
		courseEva: course?.eva,
		courseName,
		courseCode: course?.code,
	})

	CreateCourseClassForm

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
				isOpen={showCreateCourseClassList && !!course?.code}
				closeButtonAriaLabel="Cerrar"
				onDismiss={() => {
					// TODO: confirm
					setShowCreateCourseClassList(false)
				}}
			>
				<React.Suspense fallback={null}>
					{showCreateCourseClassList && course?.code && (
						<CreateCourseClassListForm
							courseCode={course.code}
							courseId={courseClassListCode}
							onClose={() => {
								setShowCreateCourseClassList(false)
							}}
						/>
					)}
				</React.Suspense>
			</Panel>

			<Panel
				headerText="Crear clase"
				isOpen={!!createCourseClassCourseClassListCode}
				closeButtonAriaLabel="Cerrar"
				onDismiss={() => {
					// TODO: confirm
					setCreateCourseClassCourseClassListCode(undefined)
				}}
			>
				<React.Suspense fallback={null}>
					{createCourseClassCourseClassListCode && (
						<CreateCourseClassForm
							courseClassListCode={createCourseClassCourseClassListCode}
							onClose={() => {
								setCreateCourseClassCourseClassListCode(undefined)
							}}
						/>
					)}
				</React.Suspense>
			</Panel>
		</>
	)
}

export const Course = React.memo(CourseComponent)
