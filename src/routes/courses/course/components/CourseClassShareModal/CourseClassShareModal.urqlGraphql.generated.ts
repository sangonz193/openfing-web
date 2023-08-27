/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../graphql/remoteSchema.types"

import * as Operations from "./CourseClassShareModal.urqlGraphql"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CourseClassByIdQueryVariables = Types.Exact<{
	id: Types.Scalars["ID"]
}>

export type CourseClassByIdQuery = {
	courseClassById:
		| {
				__typename: "CourseClass"
				id: string
				number: Types.Maybe<number>
				liveState: Types.Maybe<{ id: string }>
				courseClassList: Types.Maybe<{ id: string; code: string }>
		  }
		| { __typename: "NotFoundError" }
}

export function useCourseClassByIdQuery(
	options: Omit<Urql.UseQueryArgs<CourseClassByIdQueryVariables | undefined>, "query"> = {}
) {
	return Urql.useQuery<CourseClassByIdQuery>({ query: Operations.CourseClassByIdDocument, ...options })
}
