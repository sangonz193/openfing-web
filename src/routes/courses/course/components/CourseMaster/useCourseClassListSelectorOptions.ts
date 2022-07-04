import { useLayoutEffect, useState } from "react"

import { useCourseCourseClassListsQuery } from "./useCourseClassListSelectorOptions.urqlGraphql.generated"

export function useCourseClassListSelectorOptions(options: { courseClassListId: string | undefined }) {
	const { courseClassListId } = options
	const [selectorOptions, setSelectorOptions] = useState<Array<{ id: string; code: string; readableText: string }>>()
	const [{ data, fetching, stale }] = useCourseCourseClassListsQuery({
		variables: courseClassListId
			? {
					id: courseClassListId,
			  }
			: undefined,
		pause: !courseClassListId,
	})
	const course =
		data?.courseClassListById.__typename === "CourseClassList"
			? data?.courseClassListById.courseEdition?.course
			: undefined

	const editions = course?.editions
	const showEditionYear = editions && editions.length > 1

	useLayoutEffect(() => {
		if (fetching || stale || !course) {
			return
		}

		function getReadableText(classListName: string | null, editionYear: number | null) {
			if (!classListName) {
				return ""
			}

			if (!showEditionYear) {
				return classListName ?? ""
			}

			return [classListName, editionYear].filter(Boolean).join(" ")
		}

		const newOptions: typeof selectorOptions = []
		const skipSetNewOptions = editions?.some((edition) => {
			return edition.courseClassLists.some((classList) => {
				if (classList.name === undefined || edition.year === undefined) {
					return true
				}

				const readableText = getReadableText(classList.name, edition.year)
				newOptions.push({
					id: classList.id,
					code: classList.code,
					readableText: readableText,
				})
				return false
			})
		})

		if (!skipSetNewOptions) {
			setSelectorOptions(newOptions)
		}
	}, [fetching, stale, course])

	return selectorOptions
}
