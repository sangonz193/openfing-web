import { Link } from "@fluentui/react"
import React from "react"
import { useMediaQuery } from "react-responsive"

import { Div } from "../../../../../components/Div"
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
import { CourseClassListByCodeQueryVariables, useCourseClassListByCodeQuery } from "./Course.graphql.generated"
import { useCourseStyles } from "./useCourseStyles"

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
	const headerTitle = !courseClassListByCodeQueryResult.loading && !course ? "Oops" : courseName ? courseName : ""
	const showCourseDetail = (courseClassNumber && course) || (isSM && pinCourseClassList)

	const styles = useCourseStyles({
		className,
	})

	const evaLinkProps = useLocalLinkProps({
		href: course?.eva ?? undefined,
		className: styles.headerLink,
	})

	useLayoutOptions({
		headerTitle: headerTitle,
		headerRight: React.useMemo(
			() => !!evaLinkProps.href && <Link {...evaLinkProps}>EVA</Link>,
			[styles.headerLink, evaLinkProps]
		),
	})

	return (
		<Div className={styles.wrapper}>
			{(!courseClassNumber || pinCourseClassList) && (
				<CourseMaster key="master" className={styles.courseMaster} />
			)}

			{showCourseDetail && <CourseDetail key="detail" className={styles.courseDetails} />}
		</Div>
	)
}

export const Course = React.memo(CourseComponent)
