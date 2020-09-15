import * as Types from '../../generated/localSchema.types';

import * as Operations from './CourseClassDownloadModal.graphql';
import * as Apollo from '@apollo/client';
export type CourseClassByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type CourseClassByIdQuery = { __typename?: 'Query', courseClassById: { __typename?: 'CourseClass', id: string, videos: Array<{ __typename?: 'CourseClassVideo', id: string, qualities: Array<{ __typename?: 'CourseClassVideoQuality', id: string, formats: Array<{ __typename?: 'CourseClassVideoFormat', id: string, name: Types.Maybe<string>, url: Types.Maybe<string>, hasTorrent: Types.Maybe<boolean> }> }> }> } | { __typename?: 'NotFoundError' } };


export function useCourseClassByIdQuery(baseOptions?: Apollo.QueryHookOptions<CourseClassByIdQuery, CourseClassByIdQueryVariables>) {
        return Apollo.useQuery<CourseClassByIdQuery, CourseClassByIdQueryVariables>(Operations.courseClassById, baseOptions);
      }
export function useCourseClassByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseClassByIdQuery, CourseClassByIdQueryVariables>) {
          return Apollo.useLazyQuery<CourseClassByIdQuery, CourseClassByIdQueryVariables>(Operations.courseClassById, baseOptions);
        }
export type CourseClassByIdQueryHookResult = ReturnType<typeof useCourseClassByIdQuery>;
export type CourseClassByIdLazyQueryHookResult = ReturnType<typeof useCourseClassByIdLazyQuery>;
export type CourseClassByIdQueryResult = Apollo.QueryResult<CourseClassByIdQuery, CourseClassByIdQueryVariables>;