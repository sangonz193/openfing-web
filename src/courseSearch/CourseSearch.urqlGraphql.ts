import { gql } from "urql"

export const CourseSearchCourseFragment = gql`
	fragment CourseSearchCourse on Course {
		id
		name
		code
	}
`
