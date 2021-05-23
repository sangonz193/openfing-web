import gql from "graphql-tag"

import { CourseClassItemCourseClassFragmentDoc } from "../CourseClassItem/CourseClassItem.graphql"

export const courseClassListByCode = gql`
	query courseClassListByCode($code: String!) {
		courseClassListByCode(code: $code) {
			... on CourseClassList {
				id
				courseEdition {
					id

					course {
						id

						editions {
							id
							name

							courseClassLists {
								id
								code
								name

								courseEdition {
									id

									course {
										id
									}
								}
							}
						}
					}
				}
			}
		}
	}
`

export const courseClassListClassesByCode = gql`
	query courseClassListClassesByCode($code: String!) {
		courseClassListByCode(code: $code) {
			... on CourseClassList {
				id
				code

				classes {
					...CourseClassItemCourseClass
				}
			}
		}
	}

	${CourseClassItemCourseClassFragmentDoc}
`
