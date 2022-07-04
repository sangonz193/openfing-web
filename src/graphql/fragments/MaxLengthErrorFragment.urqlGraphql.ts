import gql from "graphql-tag"

export const MaxLengthErrorFragmentDoc = gql`
	fragment MaxLengthErrorFragment on MaxLengthError {
		__typename
		max
	}
`
