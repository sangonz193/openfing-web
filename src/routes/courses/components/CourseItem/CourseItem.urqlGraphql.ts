import gql from "graphql-tag"

export const CourseItemCourseFragmentDoc = gql`
	fragment CourseItemCourse on Course {
		id

		code
		name
		eva
		iconUrl

		editions {
			id
			year

			courseClassLists {
				id
				code
			}
		}
	}
`
