import gql from "graphql-tag"

export const CourseClassByIdDocument = gql`
	query courseClassById($id: ID!) {
		courseClassById(id: $id) {
			__typename
			... on CourseClass {
				id
				liveState {
					id
					html
					inProgress
					startDate
				}
			}
		}
	}
`

export const SetCourseClassLiveStateDocument = gql`
	mutation setCourseClassLiveState($input: SetCourseClassLiveStateInput!) {
		setCourseClassLiveState_v2(input: $input) {
			__typename

			... on SetCourseClassLiveStatePayload {
				courseClassLiveState {
					id
					courseClass {
						id
						liveState {
							id
							startDate
							html
							inProgress
						}
					}
				}
			}
		}
	}
`
