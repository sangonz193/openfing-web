/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../graphql/remoteSchema.types"

import { FaqItemFaqFragment } from "../FaqItem/FaqItem.urqlGraphql.generated"
import * as Operations from "./Faqs.urqlGraphql"
import * as Urql from "@/legacy-urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type FaqsQueryVariables = Types.Exact<{ [key: string]: never }>

export type FaqsQuery = { faqs: Array<{} & FaqItemFaqFragment> }

export function useFaqsQuery(options: Omit<Urql.UseQueryArgs<FaqsQueryVariables>, "query"> = {}) {
	return Urql.useQuery<FaqsQuery>({ query: Operations.FaqsDocument, ...options })
}
