import * as Types from '../../generated/localSchema.types';

import * as Operations from './CourseSelection.graphql';
import * as Apollo from '@apollo/client';
export type CourseClassListByCodeWithId_CourseSelectionQueryVariables = Types.Exact<{
  code: Types.Scalars['String'];
}>;


export type CourseClassListByCodeWithId_CourseSelectionQuery = { __typename?: 'Query', courseClassListByCode: { __typename?: 'CourseClassList', id: string, code: string } | { __typename?: 'NotFoundError' } };

export type CourseClassListByCodeWithClasses_CourseSelectionQueryVariables = Types.Exact<{
  code: Types.Scalars['String'];
}>;


export type CourseClassListByCodeWithClasses_CourseSelectionQuery = { __typename?: 'Query', courseClassListByCode: { __typename?: 'CourseClassList', id: string, code: string, classes: Types.Maybe<Array<{ __typename?: 'CourseClass', id: string, number: Types.Maybe<number> }>> } | { __typename?: 'NotFoundError' } };


export function useCourseClassListByCodeWithId_CourseSelectionQuery(baseOptions?: Apollo.QueryHookOptions<CourseClassListByCodeWithId_CourseSelectionQuery, CourseClassListByCodeWithId_CourseSelectionQueryVariables>) {
        return Apollo.useQuery<CourseClassListByCodeWithId_CourseSelectionQuery, CourseClassListByCodeWithId_CourseSelectionQueryVariables>(Operations.courseClassListByCodeWithId_CourseSelection, baseOptions);
      }
export function useCourseClassListByCodeWithId_CourseSelectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseClassListByCodeWithId_CourseSelectionQuery, CourseClassListByCodeWithId_CourseSelectionQueryVariables>) {
          return Apollo.useLazyQuery<CourseClassListByCodeWithId_CourseSelectionQuery, CourseClassListByCodeWithId_CourseSelectionQueryVariables>(Operations.courseClassListByCodeWithId_CourseSelection, baseOptions);
        }
export type CourseClassListByCodeWithId_CourseSelectionQueryHookResult = ReturnType<typeof useCourseClassListByCodeWithId_CourseSelectionQuery>;
export type CourseClassListByCodeWithId_CourseSelectionLazyQueryHookResult = ReturnType<typeof useCourseClassListByCodeWithId_CourseSelectionLazyQuery>;
export type CourseClassListByCodeWithId_CourseSelectionQueryResult = Apollo.QueryResult<CourseClassListByCodeWithId_CourseSelectionQuery, CourseClassListByCodeWithId_CourseSelectionQueryVariables>;
export function useCourseClassListByCodeWithClasses_CourseSelectionQuery(baseOptions?: Apollo.QueryHookOptions<CourseClassListByCodeWithClasses_CourseSelectionQuery, CourseClassListByCodeWithClasses_CourseSelectionQueryVariables>) {
        return Apollo.useQuery<CourseClassListByCodeWithClasses_CourseSelectionQuery, CourseClassListByCodeWithClasses_CourseSelectionQueryVariables>(Operations.courseClassListByCodeWithClasses_CourseSelection, baseOptions);
      }
export function useCourseClassListByCodeWithClasses_CourseSelectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseClassListByCodeWithClasses_CourseSelectionQuery, CourseClassListByCodeWithClasses_CourseSelectionQueryVariables>) {
          return Apollo.useLazyQuery<CourseClassListByCodeWithClasses_CourseSelectionQuery, CourseClassListByCodeWithClasses_CourseSelectionQueryVariables>(Operations.courseClassListByCodeWithClasses_CourseSelection, baseOptions);
        }
export type CourseClassListByCodeWithClasses_CourseSelectionQueryHookResult = ReturnType<typeof useCourseClassListByCodeWithClasses_CourseSelectionQuery>;
export type CourseClassListByCodeWithClasses_CourseSelectionLazyQueryHookResult = ReturnType<typeof useCourseClassListByCodeWithClasses_CourseSelectionLazyQuery>;
export type CourseClassListByCodeWithClasses_CourseSelectionQueryResult = Apollo.QueryResult<CourseClassListByCodeWithClasses_CourseSelectionQuery, CourseClassListByCodeWithClasses_CourseSelectionQueryVariables>;