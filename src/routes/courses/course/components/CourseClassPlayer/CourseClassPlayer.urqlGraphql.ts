import gql from "graphql-tag"

import { CourseClassPlayerVideoCourseClassVideoFormatFragmentDoc } from "../CourseClassPlayerVideo/CourseClassPlayerVideo.urqlGraphql"

export const CourseClassPlayerCourseClassVideoFragmentDoc = gql`
	fragment CourseClassPlayerCourseClassVideo on CourseClassVideo {
		id

		qualities {
			id

			formats {
				id
				...CourseClassPlayerVideoCourseClassVideoFormat
			}
		}
	}

	${CourseClassPlayerVideoCourseClassVideoFormatFragmentDoc}
`
