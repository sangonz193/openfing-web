/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Apollo from "@apollo/client"

import * as Types from "../../../graphql/remoteSchema.types"
import { CourseItemCourseFragment } from "./CourseItem/CourseItem.graphql.generated"
import * as Operations from "./Courses.graphql"
const defaultOptions = {}
export type CoursesQueryVariables = Types.Exact<{ [key: string]: never }>

export type CoursesQuery = {
	__typename?: "Query"
	courses: Array<{ __typename?: "Course" } & CourseItemCourseFragment>
}

export function useCoursesQuery(baseOptions?: Apollo.QueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<CoursesQuery, CoursesQueryVariables>(Operations.courses, options)
}
export function useCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<CoursesQuery, CoursesQueryVariables>(Operations.courses, options)
}
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>
export type CoursesQueryResult = Apollo.QueryResult<CoursesQuery, CoursesQueryVariables>
