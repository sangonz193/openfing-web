import React from "react"

import { useReactiveVars } from "../../hooks/useReactiveVars"
import { courseRouteConfig } from "../../routes/courses/course/course.route.config"
import { matchRouteConfig } from "../Navigation/matchRouteConfig"
import { useLocation } from "../Navigation/useLocation"
import { useCourseSelectionStore } from "./useCourseSelectionStore"

export const CourseSelectionManager: React.FC = () => {
	const location = useLocation()
	const store = useCourseSelectionStore()

	const match = React.useMemo(() => matchRouteConfig(location.pathname, courseRouteConfig), [location.pathname])
	const { code: courseClassListCode, courseClassNumber } = match?.params ?? {}
	const parsedCourseClassNo = React.useMemo(() => {
		const parsedNumber = !!courseClassNumber ? Number(courseClassNumber) : NaN

		return Number.isNaN(parsedNumber) ? undefined : parsedNumber
	}, [courseClassNumber])

	const { courseClassListByCodeWithClasses, courseClassListByCodeWithId } = useReactiveVars(store, [
		"courseClassListByCodeWithId",
		"courseClassListByCodeWithClasses",
	])

	React.useLayoutEffect(() => {
		if (!courseClassListByCodeWithId || !courseClassListByCodeWithClasses) {
			if (courseClassListCode) {
				store.selection({
					courseClassListCode,
					courseClassNumber: parsedCourseClassNo,
				})
			} else {
				store.selection({})
			}
		} else {
			const courseClass =
				!Number.isNaN(parsedCourseClassNo) && Array.isArray(courseClassListByCodeWithClasses.classes)
					? courseClassListByCodeWithClasses.classes.find((c) => c.number === parsedCourseClassNo)
					: undefined

			if (courseClassListCode !== courseClassListByCodeWithId.code) {
				store.courseClassListByCodeWithId(undefined)
				store.courseClassListByCodeWithClasses(undefined)
			}

			store.selection({
				courseClassListCode: courseClassListCode,
				courseClassListId: courseClassListByCodeWithId.id,
				...(courseClass
					? { courseClassId: courseClass.id, courseClassNumber: courseClass.number || undefined }
					: {}),
			})
		}
	}, [courseClassListByCodeWithClasses, courseClassListByCodeWithId, courseClassListCode, courseClassNumber])

	return null
}
