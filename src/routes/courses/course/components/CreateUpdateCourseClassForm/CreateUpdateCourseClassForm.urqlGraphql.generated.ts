/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../graphql/remoteSchema.types"

import * as Operations from "./CreateUpdateCourseClassForm.urqlGraphql"
import * as Urql from "@/legacy-urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateCourseClassMutationVariables = Types.Exact<{
	input: Types.CreateCourseClassInput
}>

export type CreateCourseClassMutation = {
	createCourseClass_v2:
		| {
				__typename: "CreateCourseClassPayload"
				courseClass: {
					id: string
					courseClassList: Types.Maybe<{
						id: string
						classes: Types.Maybe<Array<{ id: string }>>
					}>
				}
		  }
		| { __typename: "GenericError" }
		| { __typename: "AuthenticationError" }
}

export function useCreateCourseClassMutation() {
	return Urql.useMutation<CreateCourseClassMutation, CreateCourseClassMutationVariables>(
		Operations.CreateCourseClassDocument
	)
}
