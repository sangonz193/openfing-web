import gql from "graphql-tag"

export const RefreshTokenDocument = gql`
	mutation RefreshToken($input: RefreshTokenInput!) {
		refreshToken(input: $input) {
			__typename
			... on RefreshTokenPayload {
				grant {
					token
					refreshToken
				}
			}
		}
	}
`
