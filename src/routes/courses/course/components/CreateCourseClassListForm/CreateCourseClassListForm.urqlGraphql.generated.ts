/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../graphql/remoteSchema.types"

import * as Operations from "./CreateCourseClassListForm.urqlGraphql"
import * as Urql from "@/legacy-urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateCourseClassListMutationVariables = Types.Exact<{
	input: Types.CreateCourseClassListInput
}>

export type CreateCourseClassListMutation = {
	createCourseClassList_v2:
		| {
				__typename: "CreateCourseClassListPayload"
				courseClassList: {
					id: string
					code: string
					name: Types.Maybe<string>
					courseEdition: Types.Maybe<{
						id: string
						course: Types.Maybe<{
							id: string
							code: string
							editions: Array<{
								id: string
								courseClassLists: Array<{ id: string }>
							}>
						}>
						courseClassLists: Array<{ id: string }>
					}>
				}
		  }
		| { __typename: "GenericError" }
		| { __typename: "AuthenticationError" }
}

export function useCreateCourseClassListMutation() {
	return Urql.useMutation<CreateCourseClassListMutation, CreateCourseClassListMutationVariables>(
		Operations.CreateCourseClassListDocument
	)
}
