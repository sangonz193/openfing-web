/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../graphql/remoteSchema.types"

import * as Operations from "./EditCourseForm.urqlGraphql"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CourseByIdQueryVariables = Types.Exact<{
	id: Types.Scalars["ID"]
}>

export type CourseByIdQuery = {
	courseById:
		| {
				__typename: "Course"
				id: string
				code: string
				name: string
				eva: Types.Maybe<string>
				visibility: Types.Maybe<Types.CourseVisibility>
		  }
		| { __typename: "NotFoundError" }
}

export type UpdateCourseMutationVariables = Types.Exact<{
	ref: Types.CourseRef
	input: Types.UpdateCourseInput
}>

export type UpdateCourseMutation = {
	updateCourse:
		| {
				__typename: "UpdateCoursePayload"
				course: {
					id: string
					code: string
					eva: Types.Maybe<string>
					visibility: Types.Maybe<Types.CourseVisibility>
					name: string
				}
		  }
		| { __typename: "GenericError" }
		| { __typename: "AuthenticationError" }
		| { __typename: "NotFoundError" }
}

export function useCourseByIdQuery(
	options: Omit<Urql.UseQueryArgs<CourseByIdQueryVariables | undefined>, "query"> = {}
) {
	return Urql.useQuery<CourseByIdQuery>({ query: Operations.CourseByIdDocument, ...options })
}

export function useUpdateCourseMutation() {
	return Urql.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(Operations.UpdateCourseDocument)
}
