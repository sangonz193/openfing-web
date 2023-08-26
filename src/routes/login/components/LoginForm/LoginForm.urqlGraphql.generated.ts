/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../graphql/remoteSchema.types"

import * as Operations from "./LoginForm.urqlGraphql"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SignInPayloadFragmentFragment = {
	__typename: "SignInPayload"
	grant: { __typename: "Grant"; token: string; refreshToken: string }
}

export type SignInValidationErrorsFragmentFragment = {
	__typename: "SignInValidationErrors"
	email: Types.Maybe<Array<{ __typename: "RequiredFieldError" } | { __typename: "InvalidFormatError" }>>
	password: Types.Maybe<Array<{ __typename: "RequiredFieldError" }>>
}

export type SignInMutationVariables = Types.Exact<{
	input: Types.SignInInput
}>

export type SignInMutation = {
	signIn:
		| ({ __typename: "SignInPayload" } & SignInPayloadFragmentFragment)
		| { __typename: "GenericError" }
		| { __typename: "AuthenticationError" }
		| ({ __typename: "SignInValidationErrors" } & SignInValidationErrorsFragmentFragment)
		| { __typename: "EmailNotValidatedError" }
}

export function useSignInMutation() {
	return Urql.useMutation<SignInMutation, SignInMutationVariables>(Operations.SignInDocument)
}
