import gql from "graphql-tag"

export const CreateCourseDocument = gql`
	mutation createCourse($input: CreateCourseInput!) {
		createCourse_v2(input: $input) {
			__typename
			... on CreateCoursePayload {
				course {
					id
					code
					name
				}
			}
		}
	}
`
