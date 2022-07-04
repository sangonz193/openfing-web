import gql from "graphql-tag"

import { CourseClassItemCourseClassFragmentDoc } from "../CourseClassItem/CourseClassItem.urqlGraphql"

export const CourseClassListClassesByCodeDocument = gql`
	query courseClassListClassesByCode($code: String!) {
		courseClassListByCode(code: $code) {
			__typename
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
