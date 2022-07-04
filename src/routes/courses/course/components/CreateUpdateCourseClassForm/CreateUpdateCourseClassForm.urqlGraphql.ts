import gql from "graphql-tag"

export const CreateCourseClassDocument = gql`
	mutation createCourseClass($input: CreateCourseClassInput!) {
		createCourseClass_v2(input: $input) {
			__typename
			... on CreateCourseClassPayload {
				courseClass {
					id
					courseClassList {
						id
						classes {
							id
						}
					}
				}
			}
		}
	}
`
