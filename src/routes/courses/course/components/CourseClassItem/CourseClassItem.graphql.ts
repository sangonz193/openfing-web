import gql from "graphql-tag"

export const CourseClassItemCourseClassFragmentDoc = gql`
	fragment CourseClassItemCourseClass on CourseClass {
		id
		name
		number

		courseClassList {
			id
			code
		}
	}
`
