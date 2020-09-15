import * as Types from '../../generated/localSchema.types';

import { UpdateItemCourseClassFragment } from '../UpdateItem/UpdateItem.graphql.generated';
import * as Operations from './Updates.graphql';
import * as Apollo from '@apollo/client';
export type UpdatesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UpdatesQuery = { __typename?: 'Query', latestCourseClasses: Array<(
    { __typename?: 'CourseClass' }
    & UpdateItemCourseClassFragment
  )> };


export function useUpdatesQuery(baseOptions?: Apollo.QueryHookOptions<UpdatesQuery, UpdatesQueryVariables>) {
        return Apollo.useQuery<UpdatesQuery, UpdatesQueryVariables>(Operations.updates, baseOptions);
      }
export function useUpdatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpdatesQuery, UpdatesQueryVariables>) {
          return Apollo.useLazyQuery<UpdatesQuery, UpdatesQueryVariables>(Operations.updates, baseOptions);
        }
export type UpdatesQueryHookResult = ReturnType<typeof useUpdatesQuery>;
export type UpdatesLazyQueryHookResult = ReturnType<typeof useUpdatesLazyQuery>;
export type UpdatesQueryResult = Apollo.QueryResult<UpdatesQuery, UpdatesQueryVariables>;