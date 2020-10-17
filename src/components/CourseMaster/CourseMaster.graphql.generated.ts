import * as Types from '../../generated/localSchema.types';

import * as Operations from './CourseMaster.graphql';
import * as Apollo from '@apollo/client';
export type CourseClassListByCodeQueryVariables = Types.Exact<{
  code: Types.Scalars['String'];
}>;


export type CourseClassListByCodeQuery = { __typename?: 'Query', courseClassListByCode: { __typename?: 'CourseClassList', id: string, courseEdition: Types.Maybe<{ __typename?: 'CourseEdition', id: string, course: Types.Maybe<{ __typename?: 'Course', id: string, editions: Array<{ __typename?: 'CourseEdition', id: string, name: Types.Maybe<string>, courseClassLists: Array<{ __typename?: 'CourseClassList', id: string, code: string, name: Types.Maybe<string>, courseEdition: Types.Maybe<{ __typename?: 'CourseEdition', id: string, course: Types.Maybe<{ __typename?: 'Course', id: string }> }> }> }> }> }> } | { __typename?: 'NotFoundError' } };

export type CourseClassListClassesByCodeQueryVariables = Types.Exact<{
  code: Types.Scalars['String'];
}>;


export type CourseClassListClassesByCodeQuery = { __typename?: 'Query', courseClassListByCode: { __typename?: 'CourseClassList', id: string, classes: Types.Maybe<Array<{ __typename?: 'CourseClass', id: string, number: Types.Maybe<number>, name: Types.Maybe<string>, courseClassList: Types.Maybe<{ __typename?: 'CourseClassList', id: string, code: string }> }>> } | { __typename?: 'NotFoundError' } };


export function useCourseClassListByCodeQuery(baseOptions?: Apollo.QueryHookOptions<CourseClassListByCodeQuery, CourseClassListByCodeQueryVariables>) {
        return Apollo.useQuery<CourseClassListByCodeQuery, CourseClassListByCodeQueryVariables>(Operations.courseClassListByCode, baseOptions);
      }
export function useCourseClassListByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseClassListByCodeQuery, CourseClassListByCodeQueryVariables>) {
          return Apollo.useLazyQuery<CourseClassListByCodeQuery, CourseClassListByCodeQueryVariables>(Operations.courseClassListByCode, baseOptions);
        }
export type CourseClassListByCodeQueryHookResult = ReturnType<typeof useCourseClassListByCodeQuery>;
export type CourseClassListByCodeLazyQueryHookResult = ReturnType<typeof useCourseClassListByCodeLazyQuery>;
export type CourseClassListByCodeQueryResult = Apollo.QueryResult<CourseClassListByCodeQuery, CourseClassListByCodeQueryVariables>;
export function useCourseClassListClassesByCodeQuery(baseOptions?: Apollo.QueryHookOptions<CourseClassListClassesByCodeQuery, CourseClassListClassesByCodeQueryVariables>) {
        return Apollo.useQuery<CourseClassListClassesByCodeQuery, CourseClassListClassesByCodeQueryVariables>(Operations.courseClassListClassesByCode, baseOptions);
      }
export function useCourseClassListClassesByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseClassListClassesByCodeQuery, CourseClassListClassesByCodeQueryVariables>) {
          return Apollo.useLazyQuery<CourseClassListClassesByCodeQuery, CourseClassListClassesByCodeQueryVariables>(Operations.courseClassListClassesByCode, baseOptions);
        }
export type CourseClassListClassesByCodeQueryHookResult = ReturnType<typeof useCourseClassListClassesByCodeQuery>;
export type CourseClassListClassesByCodeLazyQueryHookResult = ReturnType<typeof useCourseClassListClassesByCodeLazyQuery>;
export type CourseClassListClassesByCodeQueryResult = Apollo.QueryResult<CourseClassListClassesByCodeQuery, CourseClassListClassesByCodeQueryVariables>;