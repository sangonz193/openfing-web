import gql from "graphql-tag"

export const CreateCourseClassListDocument = gql`
	mutation createCourseClassList($input: CreateCourseClassListInput!) {
		createCourseClassList_v2(input: $input) {
			__typename
			... on CreateCourseClassListPayload {
				courseClassList {
					id
					code
					name

					courseEdition {
						id
						course {
							id
							code
							editions {
								id
								courseClassLists {
									id
								}
							}
						}
						courseClassLists {
							id
						}
					}
				}
			}
		}
	}
`
