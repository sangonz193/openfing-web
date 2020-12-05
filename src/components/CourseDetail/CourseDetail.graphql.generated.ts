import * as Types from '../../generated/localSchema.types';

import * as Operations from './CourseDetail.graphql';
import * as Apollo from '@apollo/client';
export type CourseClassListByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type CourseClassListByIdQuery = { __typename?: 'Query', courseClassListById: { __typename: 'CourseClassList', id: string, courseEdition: Types.Maybe<{ __typename?: 'CourseEdition', id: string, course: Types.Maybe<{ __typename?: 'Course', id: string, iconUrl: Types.Maybe<string> }> }> } | { __typename: 'NotFoundError' } };

export type CourseClassByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type CourseClassByIdQuery = { __typename?: 'Query', courseClassById: { __typename: 'CourseClass', id: string, name: Types.Maybe<string>, createdAt: Types.Maybe<string>, videos: Array<{ __typename?: 'CourseClassVideo', id: string, name: Types.Maybe<string>, qualities: Array<{ __typename?: 'CourseClassVideoQuality', id: string, formats: Array<{ __typename?: 'CourseClassVideoFormat', id: string, name: Types.Maybe<string>, url: Types.Maybe<string> }> }> }>, chapterCues: Array<{ __typename?: 'CourseClassChapterCue', id: string, name: string, startSeconds: number, endSeconds: number, courseClass: Types.Maybe<{ __typename?: 'CourseClass', id: string }> }> } | { __typename: 'NotFoundError' } };


export function useCourseClassListByIdQuery(baseOptions?: Apollo.QueryHookOptions<CourseClassListByIdQuery, CourseClassListByIdQueryVariables>) {
        return Apollo.useQuery<CourseClassListByIdQuery, CourseClassListByIdQueryVariables>(Operations.courseClassListById, baseOptions);
      }
export function useCourseClassListByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseClassListByIdQuery, CourseClassListByIdQueryVariables>) {
          return Apollo.useLazyQuery<CourseClassListByIdQuery, CourseClassListByIdQueryVariables>(Operations.courseClassListById, baseOptions);
        }
export type CourseClassListByIdQueryHookResult = ReturnType<typeof useCourseClassListByIdQuery>;
export type CourseClassListByIdLazyQueryHookResult = ReturnType<typeof useCourseClassListByIdLazyQuery>;
export type CourseClassListByIdQueryResult = Apollo.QueryResult<CourseClassListByIdQuery, CourseClassListByIdQueryVariables>;
export function useCourseClassByIdQuery(baseOptions?: Apollo.QueryHookOptions<CourseClassByIdQuery, CourseClassByIdQueryVariables>) {
        return Apollo.useQuery<CourseClassByIdQuery, CourseClassByIdQueryVariables>(Operations.courseClassById, baseOptions);
      }
export function useCourseClassByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseClassByIdQuery, CourseClassByIdQueryVariables>) {
          return Apollo.useLazyQuery<CourseClassByIdQuery, CourseClassByIdQueryVariables>(Operations.courseClassById, baseOptions);
        }
export type CourseClassByIdQueryHookResult = ReturnType<typeof useCourseClassByIdQuery>;
export type CourseClassByIdLazyQueryHookResult = ReturnType<typeof useCourseClassByIdLazyQuery>;
export type CourseClassByIdQueryResult = Apollo.QueryResult<CourseClassByIdQuery, CourseClassByIdQueryVariables>;