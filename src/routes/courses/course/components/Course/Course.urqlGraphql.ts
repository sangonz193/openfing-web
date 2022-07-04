import gql from "graphql-tag"

export const CourseClassListByCodeDocument = gql`
	query courseClassListByCode($code: String!) {
		courseClassListByCode(code: $code) {
			__typename

			... on CourseClassList {
				id
				code

				courseEdition {
					id

					course {
						id
						code
						name
						eva
					}
				}

				classes {
					id
					number
				}
			}
		}
	}
`
