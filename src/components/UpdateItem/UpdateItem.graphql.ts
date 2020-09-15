import gql from "graphql-tag";

export const UpdateItemCourseClassFragmentDoc = gql`
	fragment UpdateItemCourseClass on CourseClass {
		id
		number
		createdAt
		name

		courseClassList {
			id
			code

			courseEdition {
				id

				course {
					id
					name
					iconUrl
				}
			}
		}
	}
`;
