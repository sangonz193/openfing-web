import gql from "graphql-tag"

export const userFromSecret = gql`
	mutation userFromSecret($secret: String!) {
		userFromSecret(secret: $secret) {
			__typename
		}
	}
`
