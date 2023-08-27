/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../graphql/remoteSchema.types"

import { CourseClassItemCourseClassFragment } from "../CourseClassItem/CourseClassItem.urqlGraphql.generated"
import * as Operations from "./CourseMaster.urqlGraphql"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CourseClassListClassesByCodeQueryVariables = Types.Exact<{
	code: Types.Scalars["String"]
}>

export type CourseClassListClassesByCodeQuery = {
	courseClassListByCode:
		| {
				__typename: "CourseClassList"
				id: string
				code: string
				classes: Types.Maybe<Array<{} & CourseClassItemCourseClassFragment>>
		  }
		| { __typename: "NotFoundError" }
}

export function useCourseClassListClassesByCodeQuery(
	options: Omit<Urql.UseQueryArgs<CourseClassListClassesByCodeQueryVariables | undefined>, "query"> = {}
) {
	return Urql.useQuery<CourseClassListClassesByCodeQuery>({
		query: Operations.CourseClassListClassesByCodeDocument,
		...options,
	})
}
