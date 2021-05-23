import gql from "graphql-tag"

export const courseClassById = gql`
	query courseClassById($id: ID!) {
		courseClassById(id: $id) {
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
