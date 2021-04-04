/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Apollo from "@apollo/client"

import * as Types from "../../../graphql/remoteSchema.types"
import { UpdateItemCourseClassFragment } from "./UpdateItem/UpdateItem.graphql.generated"
import * as Operations from "./Updates.graphql"
const defaultOptions = {}
export type UpdatesQueryVariables = Types.Exact<{ [key: string]: never }>

export type UpdatesQuery = {
	__typename?: "Query"
	latestCourseClasses: Array<{ __typename?: "CourseClass" } & UpdateItemCourseClassFragment>
}

export function useUpdatesQuery(baseOptions?: Apollo.QueryHookOptions<UpdatesQuery, UpdatesQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<UpdatesQuery, UpdatesQueryVariables>(Operations.updates, options)
}
export function useUpdatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpdatesQuery, UpdatesQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<UpdatesQuery, UpdatesQueryVariables>(Operations.updates, options)
}
export type UpdatesQueryHookResult = ReturnType<typeof useUpdatesQuery>
export type UpdatesLazyQueryHookResult = ReturnType<typeof useUpdatesLazyQuery>
export type UpdatesQueryResult = Apollo.QueryResult<UpdatesQuery, UpdatesQueryVariables>
