import gql from "graphql-tag"

export const UpdateItemCourseClassFragmentDoc = gql`
	fragment UpdateItemCourseClass on CourseClass {
		id
		number
		publishedAt
		name

		liveState {
			id
			startDate
			inProgress

			courseClass {
				id
			}
		}

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
`
