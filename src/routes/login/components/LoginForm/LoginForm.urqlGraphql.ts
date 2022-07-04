import gql from "graphql-tag"

export const SignInPayloadFragmentDoc = gql`
	fragment SignInPayloadFragment on SignInPayload {
		__typename
		grant {
			__typename
			token
			refreshToken
		}
	}
`

export const SignInValidationErrorsFragmentDoc = gql`
	fragment SignInValidationErrorsFragment on SignInValidationErrors {
		__typename
		email {
			__typename
		}
		password {
			__typename
		}
	}
`

export const SignInDocument = gql`
	mutation signIn($input: SignInInput!) {
		signIn(input: $input) {
			__typename
			...SignInPayloadFragment
			...SignInValidationErrorsFragment
		}
	}

	${SignInPayloadFragmentDoc}
	${SignInValidationErrorsFragmentDoc}
`
