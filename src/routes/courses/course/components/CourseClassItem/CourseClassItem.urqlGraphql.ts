import gql from "graphql-tag"

export const CourseClassItemCourseClassFragmentDoc = gql`
	fragment CourseClassItemCourseClass on CourseClass {
		id
		name
		number

		liveState {
			id
			startDate
			inProgress

			courseClass {
				id
			}
		}

		courseClassList {
			id
			code
		}
	}
`
