import gql from "graphql-tag"

export const MinLengthErrorFragmentDoc = gql`
	fragment MinLengthErrorFragment on MinLengthError {
		__typename
		min
	}
`
