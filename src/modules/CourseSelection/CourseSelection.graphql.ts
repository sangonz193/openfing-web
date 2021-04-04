import gql from "graphql-tag"

export const CourseSelectionCourseClassListByCodeWithId = gql`
	fragment CourseSelectionCourseClassListByCodeWithId on CourseClassList {
		id
		code
	}
`
export const CourseSelectionCourseClassListByCodeWithClasses = gql`
	fragment CourseSelectionCourseClassListByCodeWithClasses on CourseClassList {
		id
		code

		classes {
			id
			number
		}
	}
`
