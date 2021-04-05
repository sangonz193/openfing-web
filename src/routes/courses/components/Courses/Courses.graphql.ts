import gql from "graphql-tag"

import { CourseItemCourseFragmentDoc } from "../CourseItem/CourseItem.graphql"

export const courses = gql`
	query courses {
		courses {
			...CourseItemCourse
		}
	}

	${CourseItemCourseFragmentDoc}
`
