/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../graphql/remoteSchema.types"

import { UpdateItemCourseClassFragment } from "../UpdateItem/UpdateItem.urqlGraphql.generated"
import * as Operations from "./Updates.urqlGraphql"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UpdatesQueryVariables = Types.Exact<{ [key: string]: never }>

export type UpdatesQuery = {
	latestCourseClasses: Array<{} & UpdateItemCourseClassFragment>
}

export function useUpdatesQuery(options: Omit<Urql.UseQueryArgs<UpdatesQueryVariables>, "query"> = {}) {
	return Urql.useQuery<UpdatesQuery>({ query: Operations.UpdatesDocument, ...options })
}
