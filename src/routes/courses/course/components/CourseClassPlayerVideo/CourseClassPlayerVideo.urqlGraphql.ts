import gql from "graphql-tag"

export const CourseClassPlayerVideoCourseClassVideoFormatFragmentDoc = gql`
	fragment CourseClassPlayerVideoCourseClassVideoFormat on CourseClassVideoFormat {
		id
		url
		name
	}
`
