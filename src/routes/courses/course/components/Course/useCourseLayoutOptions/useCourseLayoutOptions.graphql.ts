import gql from "graphql-tag"

export const courseClassLists = gql`
	query courseClassLists($code: String!) {
		courseByCode(code: $code) {
			__typename
			... on Course {
				id
				code
				editions {
					id
					courseClassLists {
						id
						code
					}
				}
			}
		}
	}
`
