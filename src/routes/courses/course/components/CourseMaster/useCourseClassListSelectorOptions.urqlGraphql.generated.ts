/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../graphql/remoteSchema.types"

import * as Operations from "./useCourseClassListSelectorOptions.urqlGraphql"
import * as Urql from "@/legacy-urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CourseCourseClassListsQueryVariables = Types.Exact<{
	id: Types.Scalars["ID"]
}>

export type CourseCourseClassListsQuery = {
	courseClassListById:
		| {
				__typename: "CourseClassList"
				id: string
				code: string
				courseEdition: Types.Maybe<{
					id: string
					course: Types.Maybe<{
						id: string
						editions: Array<{
							id: string
							year: Types.Maybe<number>
							courseClassLists: Array<{
								id: string
								code: string
								name: Types.Maybe<string>
							}>
						}>
					}>
				}>
		  }
		| { __typename: "NotFoundError" }
}

export function useCourseCourseClassListsQuery(
	options: Omit<Urql.UseQueryArgs<CourseCourseClassListsQueryVariables | undefined>, "query"> = {}
) {
	return Urql.useQuery<CourseCourseClassListsQuery>({ query: Operations.CourseCourseClassListsDocument, ...options })
}
