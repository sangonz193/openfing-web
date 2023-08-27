/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../graphql/remoteSchema.types"

import { CourseItemCourseFragment } from "../CourseItem/CourseItem.urqlGraphql.generated"
import * as Operations from "./Courses.urqlGraphql"
import * as Urql from "@/legacy-urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CoursesQueryVariables = Types.Exact<{ [key: string]: never }>

export type CoursesQuery = {
	courses: Array<{} & CourseItemCourseFragment>
}

export function useCoursesQuery(options: Omit<Urql.UseQueryArgs<CoursesQueryVariables>, "query"> = {}) {
	return Urql.useQuery<CoursesQuery>({ query: Operations.CoursesDocument, ...options })
}
