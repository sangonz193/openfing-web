import gql from "graphql-tag"

export const SignInPayloadFragmentDoc = gql`
	fragment SignInPayloadFragment on SignInPayload {
		__typename
		accessToken
		refreshToken
		idToken
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

export const signIn = gql`
	mutation signIn($input: SignInInput!, $secret: String!) {
		signIn(input: $input, secret: $secret) {
			__typename
			...SignInPayloadFragment
			...SignInValidationErrorsFragment
		}
	}

	${SignInPayloadFragmentDoc}
	${SignInValidationErrorsFragmentDoc}
`
