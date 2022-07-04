import gql from "graphql-tag"

export const SyncCourseClassVideosForClassDocument = gql`
	mutation syncCourseClassVideosForClass($courseClassRef: CourseClassRef!) {
		syncCourseClassVideosForClass(courseClassRef: $courseClassRef) {
			__typename
			... on SyncCourseClassVideosForClassPayload {
				courseClass {
					id
					videos {
						id
						name
						qualities {
							id
							formats {
								id
								quality {
									id
								}
							}
						}
					}
				}
			}
		}
	}
`
