import * as Types from '../../generated/localSchema.types';

import * as Operations from './CourseClassShareModal.graphql';
import * as Apollo from '@apollo/client';
export type CourseClassByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type CourseClassByIdQuery = { __typename?: 'Query', courseClassById: { __typename?: 'CourseClass', id: string, number: Types.Maybe<number>, courseClassList: Types.Maybe<{ __typename?: 'CourseClassList', id: string, code: string }> } | { __typename?: 'NotFoundError' } };


export function useCourseClassByIdQuery(baseOptions?: Apollo.QueryHookOptions<CourseClassByIdQuery, CourseClassByIdQueryVariables>) {
        return Apollo.useQuery<CourseClassByIdQuery, CourseClassByIdQueryVariables>(Operations.courseClassById, baseOptions);
      }
export function useCourseClassByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseClassByIdQuery, CourseClassByIdQueryVariables>) {
          return Apollo.useLazyQuery<CourseClassByIdQuery, CourseClassByIdQueryVariables>(Operations.courseClassById, baseOptions);
        }
export type CourseClassByIdQueryHookResult = ReturnType<typeof useCourseClassByIdQuery>;
export type CourseClassByIdLazyQueryHookResult = ReturnType<typeof useCourseClassByIdLazyQuery>;
export type CourseClassByIdQueryResult = Apollo.QueryResult<CourseClassByIdQuery, CourseClassByIdQueryVariables>;