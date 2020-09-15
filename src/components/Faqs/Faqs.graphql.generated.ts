import * as Types from '../../generated/localSchema.types';

import { FaqItemFaqFragment } from '../FaqItem/FaqItem.graphql.generated';
import * as Operations from './Faqs.graphql';
import * as Apollo from '@apollo/client';
export type FaqsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FaqsQuery = { __typename?: 'Query', faqs: Array<(
    { __typename?: 'Faq' }
    & FaqItemFaqFragment
  )> };


export function useFaqsQuery(baseOptions?: Apollo.QueryHookOptions<FaqsQuery, FaqsQueryVariables>) {
        return Apollo.useQuery<FaqsQuery, FaqsQueryVariables>(Operations.faqs, baseOptions);
      }
export function useFaqsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FaqsQuery, FaqsQueryVariables>) {
          return Apollo.useLazyQuery<FaqsQuery, FaqsQueryVariables>(Operations.faqs, baseOptions);
        }
export type FaqsQueryHookResult = ReturnType<typeof useFaqsQuery>;
export type FaqsLazyQueryHookResult = ReturnType<typeof useFaqsLazyQuery>;
export type FaqsQueryResult = Apollo.QueryResult<FaqsQuery, FaqsQueryVariables>;