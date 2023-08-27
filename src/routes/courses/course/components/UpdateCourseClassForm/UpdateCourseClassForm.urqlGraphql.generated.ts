/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../graphql/remoteSchema.types"

import * as Operations from "./UpdateCourseClassForm.urqlGraphql"
import * as Urql from "@/legacy-urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UpdateCourseClassMutationVariables = Types.Exact<{
	ref: Types.CourseClassRef
	input: Types.UpdateCourseClassInput
}>

export type UpdateCourseClassMutation = {
	updateCourseClass_v2:
		| {
				__typename: "UpdateCourseClassPayload"
				courseClass: {
					name: Types.Maybe<string>
					number: Types.Maybe<number>
					publishedAt: Types.Maybe<any>
					courseClassList: Types.Maybe<{ id: string; code: string }>
				}
		  }
		| { __typename: "GenericError" }
		| { __typename: "AuthenticationError" }
		| { __typename: "NotFoundError" }
}

export type UpdateCourseClassFormCourseClassFragmentFragment = {
	id: string
	name: Types.Maybe<string>
	number: Types.Maybe<number>
	publishedAt: Types.Maybe<any>
	visibility: Types.Maybe<Types.CourseClassVisibility>
}

export function useUpdateCourseClassMutation() {
	return Urql.useMutation<UpdateCourseClassMutation, UpdateCourseClassMutationVariables>(
		Operations.UpdateCourseClassDocument
	)
}
