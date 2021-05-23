import "../../../../components/Icon/More.icon"

import { useReactiveVar } from "@apollo/client"
import { List, Panel, Separator, Spinner, SpinnerSize } from "@fluentui/react"
import { FocusZone, FocusZoneDirection } from "@fluentui/react-focus"
import React, { Suspense } from "react"

import { Container } from "../../../../components/Container/Container"
import { CreativeCommonsFooter } from "../../../../components/CreativeCommonsFooter"
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle"
import { useCourseSearchStore } from "../../../../modules/CourseSearch"
import { CourseItem } from "../CourseItem/CourseItem"
import { useCoursesQuery } from "./Courses.graphql.generated"
import { useCoursesLayoutOptions } from "./useCoursesLayoutOptions"
import { useCoursesStyles } from "./useCoursesStyles"

const LazyCreateCourseForm = React.lazy(async () => ({
	default: (await import("../CreateCourseForm")).CreateCourseForm,
}))

export type CoursesProps = {
	children?: undefined
	className?: string
}

const CoursesComponent: React.FC<CoursesProps> = ({ className }) => {
	useDocumentTitle("Cursos - OpenFING")

	const coursesResponse = useCoursesQuery()
	const courses = coursesResponse.data?.courses || []

	const [courseSearch, setCourseSearch] = React.useState("")

	const courseSearchStore = useCourseSearchStore()
	const searchResults = useReactiveVar(courseSearchStore.searchResults)

	React.useEffect(() => {
		courseSearchStore.source(courses)
	}, [coursesResponse.data?.courses])

	React.useEffect(() => {
		let canceled = false

		;(async () => {
			await new Promise((r) => setTimeout(r, 300))
			if (canceled) {
				return
			}

			courseSearchStore.searchValue(courseSearch)
		})()

		return () => {
			canceled = true
		}
	}, [courses, courseSearch])

	const showHeaderRight = false // TODO: get isAdmin condition

	const styles = useCoursesStyles({
		className,
		showHeaderRight,
	})

	const getKey = React.useCallback((user: { id: string }) => user.id, [])
	const handleRenderCell = React.useCallback(
		(item?: typeof courses[0], index?: number) => {
			return item && typeof index === "number" ? (
				<>
					<CourseItem course={item} />

					{index + 1 !== courses?.length && <Separator className={styles.searchBox} />}
				</>
			) : null
		},
		[courses, styles.searchBox]
	)

	const filteredCourses = React.useMemo(() => {
		const map = new Map<string, typeof courses[number]>()

		courses.forEach((course) => {
			map.set(course.id, course)
		})

		return searchResults.reduce<typeof courses>((res, searchResult) => {
			const fromMap = map.get(searchResult.id)

			if (fromMap) {
				res.push(fromMap)
			}

			return res
		}, [])
	}, [searchResults])

	const [showCreateCourseForm, setShowCreateCourseForm] = React.useState(false)

	useCoursesLayoutOptions({
		courseSearch,
		setCourseSearch,
		setShowCreateCourseForm,
		styles,
		showHeaderRight,
	})

	return (
		<>
			<Container className={styles.wrapper} data-is-scrollable>
				<FocusZone direction={FocusZoneDirection.vertical} className={styles.content}>
					{coursesResponse.loading ? (
						<Spinner size={SpinnerSize.large} className={styles.spinner} />
					) : (
						<List
							items={filteredCourses}
							ignoreScrollingState
							getKey={getKey}
							onRenderCell={handleRenderCell}
						/>
					)}
				</FocusZone>

				<CreativeCommonsFooter />
			</Container>

			<Panel
				headerText="Crear curso"
				isOpen={showCreateCourseForm}
				closeButtonAriaLabel="Cerrar"
				onDismiss={() => {
					// TODO: confirm
					setShowCreateCourseForm(false)
				}}
			>
				<Suspense fallback={null}>
					{showCreateCourseForm && (
						<LazyCreateCourseForm
							onClose={() => {
								// TODO: confirm
								setShowCreateCourseForm(false)
							}}
						/>
					)}
				</Suspense>
			</Panel>
		</>
	)
}

export const Courses = React.memo(CoursesComponent)
