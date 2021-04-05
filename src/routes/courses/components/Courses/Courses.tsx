import { useReactiveVar } from "@apollo/client"
import { List, SearchBox, Separator, Spinner, SpinnerSize } from "@fluentui/react"
import { FocusZone, FocusZoneDirection } from "@fluentui/react-focus"
import React from "react"

import { CreativeCommonsFooter } from "../../../../components/CreativeCommonsFooter"
import { Div } from "../../../../components/Div"
import { CANCEL_ICON_NAME } from "../../../../components/Icon/Cancel.icon"
import { SEARCH_ICON_NAME } from "../../../../components/Icon/Search.icon"
import { useLayoutOptions } from "../../../../components/Layout/useLayoutOptions"
import { useComponentWithProps } from "../../../../hooks/useComponentWithProps"
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle"
import { useCourseSearchStore } from "../../../../modules/CourseSearch"
import { CourseItem } from "../CourseItem/CourseItem"
import { useCoursesQuery } from "./Courses.graphql.generated"
import { useCoursesStyles } from "./useCoursesStyles"

export type CoursesProps = {
	children?: undefined
	className?: string
}

const CoursesComponent: React.FC<CoursesProps> = ({ className }) => {
	const styles = useCoursesStyles({
		className,
	})

	useDocumentTitle("Cursos - OpenFING")

	const coursesResponse = useCoursesQuery()
	const courses = coursesResponse.data?.courses || []

	const [courseSearch, setCourseSearch] = React.useState("")

	const courseSearchStore = useCourseSearchStore()
	const searchResults = useReactiveVar(courseSearchStore.searchResults)

	React.useEffect(() => {
		courseSearchStore.source(courses)
	}, [coursesResponse.data?.courses])

	const CourseSearchBox = useComponentWithProps(
		(props) => {
			const { courseSearch, styles } = props

			return (
				<SearchBox
					className={styles.searchField}
					placeholder="Buscar"
					value={courseSearch}
					onChange={(_, v) => setCourseSearch(v || "")}
					iconProps={{ iconName: SEARCH_ICON_NAME }}
					clearButtonProps={{
						iconProps: {
							iconName: CANCEL_ICON_NAME,
							className: styles.searchBoxClearButtonIcon,
						},
					}}
				/>
			)
		},
		{ courseSearch, styles }
	)

	useLayoutOptions({ headerTitle: React.useMemo(() => <CourseSearchBox />, []) })

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

	return (
		<Div className={styles.wrapper} data-is-scrollable>
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
		</Div>
	)
}

export const Courses = React.memo(CoursesComponent)
