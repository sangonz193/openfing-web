/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../graphql/remoteSchema.types"

import * as Operations from "./Course.urqlGraphql"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CourseClassListByCodeQueryVariables = Types.Exact<{
	code: Types.Scalars["String"]
}>

export type CourseClassListByCodeQuery = {
	courseClassListByCode:
		| {
				__typename: "CourseClassList"
				id: string
				code: string
				courseEdition: Types.Maybe<{
					id: string
					course: Types.Maybe<{
						id: string
						code: string
						name: string
						eva: Types.Maybe<string>
					}>
				}>
				classes: Types.Maybe<Array<{ id: string; number: Types.Maybe<number> }>>
		  }
		| { __typename: "NotFoundError" }
}

export function useCourseClassListByCodeQuery(
	options: Omit<Urql.UseQueryArgs<CourseClassListByCodeQueryVariables | undefined>, "query"> = {}
) {
	return Urql.useQuery<CourseClassListByCodeQuery>({ query: Operations.CourseClassListByCodeDocument, ...options })
}
