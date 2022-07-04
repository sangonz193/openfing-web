import gql from "graphql-tag"

import { MaxLengthErrorFragmentDoc } from "../../../../graphql/fragments/MaxLengthErrorFragment.urqlGraphql"
import { MinLengthErrorFragmentDoc } from "../../../../graphql/fragments/MinLengthErrorFragment.urqlGraphql"

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

export const SignUpDocument = gql`
	mutation signUp($input: SignUpInput!) {
		signUp(input: $input) {
			__typename
			...SignUpValidationErrorsFragment
		}
	}

	${SignUpValidationErrorsFragmentDoc}
`
