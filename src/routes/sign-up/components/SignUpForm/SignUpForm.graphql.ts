import gql from "graphql-tag"

import { MaxLengthErrorFragmentDoc } from "../../../../graphql/fragments/MaxLengthErrorFragment.graphql"
import { MinLengthErrorFragmentDoc } from "../../../../graphql/fragments/MinLengthErrorFragment.graphql"

export const SignUpValidationErrorsFragmentDoc = gql`
	fragment SignUpValidationErrorsFragment on SignUpValidationErrors {
		email {
			__typename
			...MaxLengthErrorFragment
		}
		password {
			__typename
			...MaxLengthErrorFragment
			...MinLengthErrorFragment
		}
		firstName {
			__typename
			...MinLengthErrorFragment
			...MaxLengthErrorFragment
		}
		lastName {
			__typename
			...MaxLengthErrorFragment
		}
	}

	${MaxLengthErrorFragmentDoc}
	${MinLengthErrorFragmentDoc}
`

export const signUp = gql`
	mutation signUp($input: SignUpInput!, $secret: String!) {
		signUp(input: $input, secret: $secret) {
			__typename
			...SignUpValidationErrorsFragment
		}
	}

	${SignUpValidationErrorsFragmentDoc}
`
