import gql from "graphql-tag";

export const courseClassListByCode = gql`
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
`;
