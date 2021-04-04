/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Apollo from "@apollo/client"

import * as Types from "../../../graphql/remoteSchema.types"
import { FaqItemFaqFragment } from "./FaqItem/FaqItem.graphql.generated"
import * as Operations from "./Faqs.graphql"
const defaultOptions = {}
export type FaqsQueryVariables = Types.Exact<{ [key: string]: never }>

export type FaqsQuery = { __typename?: "Query"; faqs: Array<{ __typename?: "Faq" } & FaqItemFaqFragment> }

export function useFaqsQuery(baseOptions?: Apollo.QueryHookOptions<FaqsQuery, FaqsQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<FaqsQuery, FaqsQueryVariables>(Operations.faqs, options)
}
export function useFaqsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FaqsQuery, FaqsQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<FaqsQuery, FaqsQueryVariables>(Operations.faqs, options)
}
export type FaqsQueryHookResult = ReturnType<typeof useFaqsQuery>
export type FaqsLazyQueryHookResult = ReturnType<typeof useFaqsLazyQuery>
export type FaqsQueryResult = Apollo.QueryResult<FaqsQuery, FaqsQueryVariables>
