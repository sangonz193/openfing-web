import gql from "graphql-tag"

import { CourseItemCourseFragmentDoc } from "../CourseItem/CourseItem.urqlGraphql"

export const CoursesDocument = gql`
	query Courses {
		courses {
			...CourseItemCourse
		}
	}
	${CourseItemCourseFragmentDoc}
`
