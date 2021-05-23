import { gql } from "@apollo/client"

export const CourseFragment_CourseSearch = gql`
	fragment CourseFragment_CourseSearch on Course {
		id
		name
		code
	}
`
