import { gql } from "@apollo/client";

export const courseClassListById = gql`
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
`;

export const courseClassById = gql`
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
						}
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
`;
