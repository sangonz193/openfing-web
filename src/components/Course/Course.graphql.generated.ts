import * as Types from '../../generated/localSchema.types';

import * as Operations from './Course.graphql';
import * as Apollo from '@apollo/client';
export type CourseClassListByCodeQueryVariables = Types.Exact<{
  code: Types.Scalars['String'];
}>;


export type CourseClassListByCodeQuery = { __typename?: 'Query', courseClassListByCode: { __typename: 'CourseClassList', id: string, courseEdition: Types.Maybe<{ __typename?: 'CourseEdition', id: string, course: Types.Maybe<{ __typename?: 'Course', id: string, name: string, eva: Types.Maybe<string> }> }>, classes: Types.Maybe<Array<{ __typename?: 'CourseClass', id: string, number: Types.Maybe<number> }>> } | { __typename: 'NotFoundError' } };


export function useCourseClassListByCodeQuery(baseOptions?: Apollo.QueryHookOptions<CourseClassListByCodeQuery, CourseClassListByCodeQueryVariables>) {
        return Apollo.useQuery<CourseClassListByCodeQuery, CourseClassListByCodeQueryVariables>(Operations.courseClassListByCode, baseOptions);
      }
export function useCourseClassListByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseClassListByCodeQuery, CourseClassListByCodeQueryVariables>) {
          return Apollo.useLazyQuery<CourseClassListByCodeQuery, CourseClassListByCodeQueryVariables>(Operations.courseClassListByCode, baseOptions);
        }
export type CourseClassListByCodeQueryHookResult = ReturnType<typeof useCourseClassListByCodeQuery>;
export type CourseClassListByCodeLazyQueryHookResult = ReturnType<typeof useCourseClassListByCodeLazyQuery>;
export type CourseClassListByCodeQueryResult = Apollo.QueryResult<CourseClassListByCodeQuery, CourseClassListByCodeQueryVariables>;