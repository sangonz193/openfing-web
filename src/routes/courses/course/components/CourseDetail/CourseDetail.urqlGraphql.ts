import { gql } from "urql"

export const CourseClassListByIdDocument = gql`
	query courseClassListById($id: ID!) {
		courseClassListById(id: $id) {
			__typename
			... on CourseClassList {
				id
				courseEdition {
					id
					course {
						id
						iconUrl
					}
				}
			}
		}
	}
`

export const CourseClassByIdDocument = gql`
	query courseClassById($id: ID!) {
		courseClassById(id: $id) {
			__typename
			... on CourseClass {
				id
				name
				publishedAt

				videos {
					id
					name
					qualities {
						id
						formats {
							id
							name
							url
							hasTorrent
						}
					}
				}

				liveState {
					id
					startDate
					html
					inProgress
					courseClass {
						id
					}
				}

				chapterCues {
					id
					name
					startSeconds
					endSeconds
					courseClass {
						id
					}
				}
			}
		}
	}
`
