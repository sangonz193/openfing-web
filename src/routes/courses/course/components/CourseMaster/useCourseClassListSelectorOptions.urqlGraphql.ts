import { gql } from "urql"

export const CourseCourseClassListsDocument = gql`
	query courseCourseClassLists($id: ID!) {
		courseClassListById(id: $id) {
			__typename
			... on CourseClassList {
				id
				code
				courseEdition {
					id
					course {
						id
						editions {
							id
							year
							courseClassLists {
								id
								code
								name
							}
						}
					}
				}
			}
		}
	}
`
