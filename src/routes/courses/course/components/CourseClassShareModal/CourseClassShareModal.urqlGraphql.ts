import gql from "graphql-tag"

export const CourseClassByIdDocument = gql`
	query courseClassById($id: ID!) {
		courseClassById(id: $id) {
			__typename
			... on CourseClass {
				id
				number
				liveState {
					id
				}

				courseClassList {
					id
					code
				}
			}
		}
	}
`
