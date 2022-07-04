import gql from "graphql-tag"

export const UpdateCourseClassDocument = gql`
	mutation updateCourseClass($ref: CourseClassRef!, $input: UpdateCourseClassInput!) {
		updateCourseClass_v2(ref: $ref, input: $input) {
			__typename
			... on UpdateCourseClassPayload {
				courseClass {
					name
					number
					publishedAt
					courseClassList {
						id
						code
					}
				}
			}
		}
	}
`

export const UpdateCourseClassFormCourseClassFragmentDoc = gql`
	fragment UpdateCourseClassFormCourseClassFragment on CourseClass {
		id
		name
		number
		publishedAt
		visibility
	}
`
