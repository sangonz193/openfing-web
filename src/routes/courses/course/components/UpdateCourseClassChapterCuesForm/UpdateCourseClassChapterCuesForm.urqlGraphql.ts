import gql from "graphql-tag"

export const CourseClassByIdDocument = gql`
	query courseClassById($id: ID!) {
		courseClassById(id: $id) {
			__typename
			... on CourseClass {
				id
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

export const CreateCourseClassChapterCueDocument = gql`
	mutation createCourseClassChapterCue($input: CreateCourseClassChapterCueInput!) {
		createCourseClassChapterCue(input: $input) {
			__typename
			... on CreateCourseClassChapterCuePayload {
				courseClassChapterCue {
					id
					name
					startSeconds
					endSeconds
					courseClass {
						id
						chapterCues {
							id
						}
					}
				}
			}
		}
	}
`

export const DeleteCourseClassChapterCuesFromCourseClassDocument = gql`
	mutation deleteCourseClassChapterCuesFromCourseClass($input: DeleteCourseClassChapterCuesFromCourseClassInput!) {
		deleteCourseClassChapterCuesFromCourseClass(input: $input) {
			__typename
			... on DeleteCourseClassChapterCuesFromCourseClassPayload {
				courseClass {
					id
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
	}
`
