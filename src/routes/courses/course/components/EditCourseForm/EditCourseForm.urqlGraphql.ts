import gql from "graphql-tag"

export const CourseByIdDocument = gql`
	query courseById($id: ID!) {
		courseById(id: $id) {
			__typename
			... on Course {
				id
				code
				name
				eva
				visibility
			}
		}
	}
`

export const UpdateCourseDocument = gql`
	mutation updateCourse($ref: CourseRef!, $input: UpdateCourseInput!) {
		updateCourse(ref: $ref, input: $input) {
			__typename

			... on UpdateCoursePayload {
				course {
					id
					code
					eva
					visibility
					name
				}
			}
		}
	}
`
