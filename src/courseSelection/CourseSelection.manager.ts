import React, { useMemo } from "react"
import { useLocation } from "react-router-dom"

import { matchPath } from "@/lib/react-router-dom/matchPath"

import { useObservableStates } from "../hooks/useObservableStates"
import { type CourseParams, courseRouteConfig } from "../routes/courses/course/course.route.config"
import { useCourseSelectionStore } from "./useCourseSelectionStore"

export function CourseSelectionManager() {
	const location = useLocation()
	const store = useCourseSelectionStore()

	const match = useMemo(
		() =>
			matchPath<keyof CourseParams, typeof courseRouteConfig.path>(
				{ path: courseRouteConfig.path },
				location.pathname
			),
		[location.pathname]
	)
	const { code: courseClassListCode, courseClassNumber } = match?.params ?? {}
	const parsedCourseClassNo = React.useMemo(() => {
		const parsedNumber = !!courseClassNumber ? Number(courseClassNumber) : NaN

		return Number.isNaN(parsedNumber) ? undefined : parsedNumber
	}, [courseClassNumber])

	const { courseClassListByCodeWithClasses, courseClassListByCodeWithId } = useObservableStates(store, [
		"courseClassListByCodeWithId",
		"courseClassListByCodeWithClasses",
	])

	const courseClass = React.useMemo(() => {
		if (!Number.isNaN(parsedCourseClassNo) && Array.isArray(courseClassListByCodeWithClasses?.classes)) {
			return courseClassListByCodeWithClasses?.classes.find((c) => c.number === parsedCourseClassNo)
		}
		return undefined
	}, [courseClassListByCodeWithClasses, courseClassListByCodeWithClasses?.classes, parsedCourseClassNo])

	const { classes } = courseClassListByCodeWithClasses ?? {}
	const courseClassId = React.useMemo(() => {
		const parsedCourseClassNumber = courseClassNumber ? Number(courseClassNumber) : Number.NaN

		if (
			!classes?.length ||
			typeof parsedCourseClassNumber !== "number" ||
			Number.isNaN(parsedCourseClassNumber) ||
			!Number.isFinite(parsedCourseClassNumber)
		) {
			return undefined
		}

		return classes.find((courseClass) => courseClass.number === parsedCourseClassNumber)?.id
	}, [classes, courseClassNumber])

	React.useLayoutEffect(() => {
		const currentSelection = store.selection.getValue()

		if (!courseClassListByCodeWithId || !courseClassListByCodeWithClasses) {
			if (courseClassListCode) {
				store.selection.next({
					...currentSelection,
					courseClassListCode,
					courseClassNumber: parsedCourseClassNo,
					courseClassId: courseClassId,
				})
			} else {
				store.selection.next({})
			}
		} else {
			if (courseClassListCode !== courseClassListByCodeWithId.code) {
				store.courseClassListByCodeWithId.next(undefined)
				store.courseClassListByCodeWithClasses.next(undefined)
			}

			store.selection.next({
				...currentSelection,
				courseClassListCode: courseClassListCode,
				courseClassListId: courseClassListByCodeWithId.id,
				...(courseClass
					? {
							courseClassId: courseClassId || courseClass.id,
							courseClassNumber: courseClass.number || currentSelection.courseClassNumber,
					  }
					: {}),
			})
		}
	}, [
		courseClassListByCodeWithClasses,
		courseClassListByCodeWithId,
		courseClassListCode,
		parsedCourseClassNo,
		courseClass,
		courseClassId,
	])

	return null
}
