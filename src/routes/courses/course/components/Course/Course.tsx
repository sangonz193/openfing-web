import { Panel, Stack } from "@fluentui/react"
import React, { useRef } from "react"
import { useEffect } from "react"
import { useMediaQuery } from "react-responsive"

import {} from "../../../../../components/Icon/cancel"
import { useDocumentTitle } from "../../../../../hooks/useDocumentTitle"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { useQueryParams } from "../../../../../hooks/useQueryParams"
import { useAuthStore } from "../../../../../modules/Auth"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useCourseSelectionStore } from "../../../../../modules/CourseSelection"
import { registerPageView } from "../../../../../modules/GoogleAnalytics/registerPageView"
import { useHistory } from "../../../../../modules/Navigation/useHistory"
import { Breakpoint } from "../../../../../styles/Breakpoint"
import { CourseDetail } from "../CourseDetail"
import { CourseMaster } from "../CourseMaster"
import { EditCourseFormWrapper } from "../EditCourseFormWrapper"
import { useCourseClassListByCodeQuery } from "./Course.urqlGraphql.generated"
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

const EditCourseClassLiveStateForm = React.lazy(() =>
	import("../EditCourseClassLiveStateForm").then(({ EditCourseClassLiveStateForm }) => ({
		default: EditCourseClassLiveStateForm,
	}))
)

const UpdateCourseClassChapterCuesForm = React.lazy(() =>
	import("../UpdateCourseClassChapterCuesForm").then(({ UpdateCourseClassChapterCuesForm }) => ({
		default: UpdateCourseClassChapterCuesForm,
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
	const { pinCourseClassList } = useObservableStates(courseClassPlayerStore, ["pinCourseClassList"])

	const { grant } = useObservableStates(useAuthStore(), ["grant"])

	const [courseClassListByCodeQueryResult] = useCourseClassListByCodeQuery({
		variables: {
			code: courseClassListCode,
		},
	})
	const course =
		courseClassListByCodeQueryResult.data?.courseClassListByCode?.__typename === "CourseClassList"
			? courseClassListByCodeQueryResult.data?.courseClassListByCode.courseEdition?.course
			: undefined

	const { courseClassListByCode } = courseClassListByCodeQueryResult.data ?? {}
	React.useEffect(() => {
		if (courseClassListByCode?.__typename === "CourseClassList") {
			courseSelectionStore.courseClassListByCodeWithId.next(courseClassListByCode)
			courseSelectionStore.courseClassListByCodeWithClasses.next(courseClassListByCode)
		}
	}, [courseClassListByCode])

	const courseName = course?.name
	useDocumentTitle(`${courseName || "Curso"} - OpenFING`)

	const registerPageViewCalledRef = useRef(false)
	useEffect(() => {
		if (courseName) {
			registerPageView({
				path: history.location.pathname,
				title: courseName,
			})
			registerPageViewCalledRef.current = true
		}
	}, [courseName])

	React.useEffect(() => {
		const tParamOrEmptyString = Array.isArray(queryParams.t) ? "" : queryParams.t
		courseClassPlayerStore.urlHash.next(queryParams.t ? "#t=" + tParamOrEmptyString : history.location.hash)
	}, [queryParams.t, history.location.hash])

	const isSm = useMediaQuery({ minWidth: Breakpoint.sm })
	const showCourseDetail = (courseClassNumber && course) || isSm

	const styles = useCourseStyles({
		className,
	})

	const [showEditLiveState, setShowEditLiveState] = React.useState(false)
	const [showEditChapters, setShowEditChapters] = React.useState(false)
	const [showEditCourse, setShowEditCourse] = React.useState(false)
	const [showCreateCourseClassList, setShowCreateCourseClassList] = React.useState(false)
	const [createCourseClassCourseClassListCode, setCreateCourseClassCourseClassListCode] = React.useState<string>()

	const courseClassId = React.useMemo(() => {
		if (
			!courseClassListByCodeQueryResult.data ||
			courseClassListByCodeQueryResult.data.courseClassListByCode.__typename === "NotFoundError"
		) {
			return
		}

		const parsedCourseClassNumber = courseClassNumber ? Number(courseClassNumber) : Number.NaN
		const { classes } = courseClassListByCodeQueryResult.data.courseClassListByCode
		if (
			!classes?.length ||
			typeof parsedCourseClassNumber !== "number" ||
			Number.isNaN(parsedCourseClassNumber) ||
			!Number.isFinite(parsedCourseClassNumber)
		) {
			return undefined
		}

		return classes.find((courseClass) => courseClass.number === parsedCourseClassNumber)?.id
	}, [courseClassListByCodeQueryResult.data, courseClassNumber])

	useCourseLayoutOptions({
		courseClassId: courseClassId,
		courseClassListCode: courseClassListCode,
		onShowCreateCourseClassListForm: React.useCallback(() => setShowCreateCourseClassList(true), []),
		onShowCreateCourseClassForm: setCreateCourseClassCourseClassListCode,
		onEditLiveState: React.useCallback(() => setShowEditLiveState(true), []),
		onEditChapters: React.useCallback(() => setShowEditChapters(true), []),
		onEditCourse: React.useCallback(() => setShowEditCourse(true), []),
		styles: styles,
		courseClassListByCodeQueryResult: courseClassListByCodeQueryResult,
		courseEva: course?.eva,
		courseName,
		courseCode: course?.code,
	})

	const showMaster = (pinCourseClassList && isSm) || !courseClassNumber

	return (
		<>
			<Stack className={styles.wrapper} disableShrink>
				{showMaster && <CourseMaster className={styles.courseMaster} />}

				<Stack.Item shrink grow>
					{showCourseDetail && <CourseDetail className={styles.courseDetails} />}
				</Stack.Item>
			</Stack>

			<Panel
				headerText="Crear lista de clases"
				isOpen={showCreateCourseClassList && !!(course?.code || courseClassListCode)}
				closeButtonAriaLabel="Cerrar"
				onDismiss={() => {
					// TODO: confirm
					setShowCreateCourseClassList(false)
				}}
			>
				<React.Suspense fallback={null}>
					{showCreateCourseClassList && !!(course?.code || courseClassListCode) && (
						<CreateCourseClassListForm
							courseCode={course?.code || courseClassListCode}
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

			<Panel
				headerText="Editar estado en vivo"
				isOpen={!!showEditLiveState}
				closeButtonAriaLabel="Cerrar"
				onDismiss={() => {
					// TODO: confirm
					setShowEditLiveState(false)
				}}
			>
				{showEditLiveState && grant && courseClassId && (
					<React.Suspense fallback={null}>
						<EditCourseClassLiveStateForm
							courseClassId={courseClassId}
							onClose={() => {
								setShowEditLiveState(false)
							}}
						/>
					</React.Suspense>
				)}
			</Panel>

			<Panel
				headerText="Editar capítulos"
				isOpen={!!showEditChapters}
				closeButtonAriaLabel="Cerrar"
				onDismiss={() => {
					// TODO: confirm
					setShowEditChapters(false)
				}}
			>
				{showEditChapters && grant && courseClassId && (
					<React.Suspense fallback={null}>
						<UpdateCourseClassChapterCuesForm
							courseClassId={courseClassId}
							onClose={() => {
								setShowEditChapters(false)
							}}
						/>
					</React.Suspense>
				)}
			</Panel>

			{course && (
				<EditCourseFormWrapper
					courseId={course.id}
					open={showEditCourse}
					onClose={() => setShowEditCourse(false)}
				/>
			)}
		</>
	)
}

export const Course = React.memo(CourseComponent)
