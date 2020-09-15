import gql from "graphql-tag";

import { CourseClassPlayerVideoCourseClassVideoFormatFragmentDoc } from "../CourseClassPlayerVideo/CourseClassPlayerVideo.graphql";

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
`;
