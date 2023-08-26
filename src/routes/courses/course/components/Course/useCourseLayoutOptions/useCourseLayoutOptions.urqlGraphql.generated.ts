/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../../graphql/remoteSchema.types"

import * as Operations from "./useCourseLayoutOptions.urqlGraphql"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CourseClassListsQueryVariables = Types.Exact<{
	code: Types.Scalars["String"]
}>

export type CourseClassListsQuery = {
	courseByCode:
		| {
				__typename: "Course"
				id: string
				code: string
				name: string
				editions: Array<{
					id: string
					courseClassLists: Array<{ id: string; code: string }>
				}>
		  }
		| { __typename: "NotFoundError" }
}

export function useCourseClassListsQuery(
	options: Omit<Urql.UseQueryArgs<CourseClassListsQueryVariables>, "query"> = {}
) {
	return Urql.useQuery<CourseClassListsQuery>({ query: Operations.CourseClassListsDocument, ...options })
}
