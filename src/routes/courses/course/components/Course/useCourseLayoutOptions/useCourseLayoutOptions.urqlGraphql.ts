import gql from "graphql-tag"

export const CourseClassListsDocument = gql`
	query courseClassLists($code: String!) {
		courseByCode(code: $code) {
			__typename
			... on Course {
				id
				code
				name
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
