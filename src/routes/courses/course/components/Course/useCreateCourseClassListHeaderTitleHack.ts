import { useApolloClient } from "@apollo/client"
import React from "react"

import type { CourseClassListByCodeQuery } from "./Course.graphql.generated"
import { getCreatedCourseFromCacheHack } from "./getCreatedCourseFromCacheHack"

export const useCreateCourseClassListHeaderTitleHack = (
	headerTitle: string,
	courseCode: string,
	data: CourseClassListByCodeQuery["courseClassListByCode"] | undefined | null
) => {
	const apolloClient = useApolloClient()
	const [overrideHeaderTitle, setOverrideHeaderTitle] = React.useState<string>()

	React.useEffect(() => {
		if (data?.__typename !== "NotFoundError") {
			return
		}

		const newHeaderTitle = getCreatedCourseFromCacheHack(apolloClient.cache.extract(), courseCode)?.name

		if (newHeaderTitle && headerTitle !== newHeaderTitle) {
			setOverrideHeaderTitle(newHeaderTitle)
		}
	}, [headerTitle])

	return {
		headerTitle: overrideHeaderTitle ?? headerTitle,
		headerTitleOverride: !!overrideHeaderTitle,
	}
}
