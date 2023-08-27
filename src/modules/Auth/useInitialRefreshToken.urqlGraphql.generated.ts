/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../graphql/remoteSchema.types"

import * as Operations from "./useInitialRefreshToken.urqlGraphql"
import * as Urql from "@/legacy-urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RefreshTokenMutationVariables = Types.Exact<{
	input: Types.RefreshTokenInput
}>

export type RefreshTokenMutation = {
	refreshToken:
		| { __typename: "RefreshTokenPayload"; grant: { token: string; refreshToken: string } }
		| { __typename: "GenericError" }
		| { __typename: "AuthenticationError" }
}

export function useRefreshTokenMutation() {
	return Urql.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(Operations.RefreshTokenDocument)
}
