/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../graphql/remoteSchema.types"

import * as Operations from "./CreatePostForm.urqlGraphql"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreatePostMutationVariables = Types.Exact<{
	input: Types.CreatePostInput
}>

export type CreatePostMutation = {
	createPost:
		| {
				__typename: "CreatePostPayload"
				post: {
					id: string
					title: string
					mdContent: string
					publishedAt: Types.Maybe<any>
				}
		  }
		| { __typename: "GenericError" }
		| { __typename: "AuthenticationError" }
}

export type UpdatePostMutationVariables = Types.Exact<{
	id: Types.Scalars["ID"]
	input: Types.UpdatePostInput
}>

export type UpdatePostMutation = {
	updatePost:
		| {
				__typename: "UpdatePostPayload"
				post: {
					id: string
					title: string
					mdContent: string
					publishedAt: Types.Maybe<any>
				}
		  }
		| { __typename: "GenericError" }
		| { __typename: "AuthenticationError" }
		| { __typename: "NotFoundError" }
}

export type PostFragmentFragment = {
	id: string
	title: string
	mdContent: string
	publishedAt: Types.Maybe<any>
}

export function useCreatePostMutation() {
	return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(Operations.CreatePostDocument)
}

export function useUpdatePostMutation() {
	return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(Operations.UpdatePostDocument)
}
