/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../graphql/remoteSchema.types"

import { MaxLengthErrorFragmentFragment } from "../../../../graphql/fragments/MaxLengthErrorFragment.urqlGraphql.generated"
import { MinLengthErrorFragmentFragment } from "../../../../graphql/fragments/MinLengthErrorFragment.urqlGraphql.generated"
import * as Operations from "./SignUpForm.urqlGraphql"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SignUpValidationErrorsFragmentFragment = {
	email: Types.Maybe<
		Array<
			| { __typename: "RequiredFieldError" }
			| { __typename: "InvalidEmailDomainError" }
			| { __typename: "InvalidFormatError" }
			| ({ __typename: "MaxLengthError" } & MaxLengthErrorFragmentFragment)
		>
	>
	password: Types.Maybe<
		Array<
			| { __typename: "RequiredFieldError" }
			| ({ __typename: "MinLengthError" } & MinLengthErrorFragmentFragment)
			| ({ __typename: "MaxLengthError" } & MaxLengthErrorFragmentFragment)
		>
	>
	firstName: Types.Maybe<
		Array<
			| { __typename: "RequiredFieldError" }
			| ({ __typename: "MinLengthError" } & MinLengthErrorFragmentFragment)
			| ({ __typename: "MaxLengthError" } & MaxLengthErrorFragmentFragment)
		>
	>
	lastName: Types.Maybe<Array<{ __typename: "MaxLengthError" } & MaxLengthErrorFragmentFragment>>
}

export type SignUpMutationVariables = Types.Exact<{
	input: Types.SignUpInput
}>

export type SignUpMutation = {
	signUp: Types.Maybe<
		| { __typename: "GenericError" }
		| { __typename: "AuthenticationError" }
		| ({ __typename: "SignUpValidationErrors" } & SignUpValidationErrorsFragmentFragment)
		| { __typename: "SignUpEmailNotSentPayload" }
	>
}

export function useSignUpMutation() {
	return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(Operations.SignUpDocument)
}
