/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../graphql/remoteSchema.types"

import * as Operations from "./Post.urqlGraphql"
import * as Urql from "@/legacy-urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type PostFragmentFragment = {
	id: string
	title: string
	mdContent: string
	publishedAt: Types.Maybe<any>
}

export type DeletePostMutationVariables = Types.Exact<{
	id: Types.Scalars["ID"]
}>

export type DeletePostMutation = {
	deletePost:
		| { __typename: "DeletePostPayload" }
		| { __typename: "GenericError" }
		| { __typename: "AuthenticationError" }
		| { __typename: "NotFoundError" }
}

export function useDeletePostMutation() {
	return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(Operations.DeletePostDocument)
}
