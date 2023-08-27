/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../graphql/remoteSchema.types"

import * as Operations from "./CreateCourseForm.urqlGraphql"
import * as Urql from "@/legacy-urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateCourseMutationVariables = Types.Exact<{
	input: Types.CreateCourseInput
}>

export type CreateCourseMutation = {
	createCourse_v2:
		| {
				__typename: "CreateCoursePayload"
				course: { id: string; code: string; name: string }
		  }
		| { __typename: "GenericError" }
		| { __typename: "AuthenticationError" }
}

export function useCreateCourseMutation() {
	return Urql.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(Operations.CreateCourseDocument)
}
