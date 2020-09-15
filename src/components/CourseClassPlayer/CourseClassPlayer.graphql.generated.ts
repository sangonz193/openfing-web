import { CourseClassPlayerVideoCourseClassVideoFormatFragment } from '../CourseClassPlayerVideo/CourseClassPlayerVideo.graphql.generated';
export type CourseClassPlayerCourseClassVideoFragment = { __typename?: 'CourseClassVideo', id: string, qualities: Array<{ __typename?: 'CourseClassVideoQuality', id: string, formats: Array<(
      { __typename?: 'CourseClassVideoFormat', id: string }
      & CourseClassPlayerVideoCourseClassVideoFormatFragment
    )> }> };
