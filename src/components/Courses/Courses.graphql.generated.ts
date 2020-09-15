import * as Types from '../../generated/localSchema.types';

import { CourseItemCourseFragment } from '../CourseItem/CourseItem.graphql.generated';
import * as Operations from './Courses.graphql';
import * as Apollo from '@apollo/client';
export type CoursesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CoursesQuery = { __typename?: 'Query', courses: Array<(
    { __typename?: 'Course' }
    & CourseItemCourseFragment
  )> };


export function useCoursesQuery(baseOptions?: Apollo.QueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
        return Apollo.useQuery<CoursesQuery, CoursesQueryVariables>(Operations.courses, baseOptions);
      }
export function useCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
          return Apollo.useLazyQuery<CoursesQuery, CoursesQueryVariables>(Operations.courses, baseOptions);
        }
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>;
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>;
export type CoursesQueryResult = Apollo.QueryResult<CoursesQuery, CoursesQueryVariables>;