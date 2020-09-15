import { gql } from "@apollo/client";

export const courseClassById = gql`
	query courseClassById($id: ID!) {
		courseClassById(id: $id) {
			... on CourseClass {
				id
				number

				courseClassList {
					id
					code
				}
			}
		}
	}
`;
