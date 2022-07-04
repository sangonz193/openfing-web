import { gql } from "urql"

export const RefreshTokenDocument = gql`
	mutation refreshToken($input: RefreshTokenInput!) {
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
