/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../graphql/remoteSchema.types"

import { PostFragmentFragment } from "../Post/Post.urqlGraphql.generated"
import * as Operations from "./Blog.urqlGraphql"
import * as Urql from "@/legacy-urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type PostsQueryVariables = Types.Exact<{ [key: string]: never }>

export type PostsQuery = { posts: Array<{} & PostFragmentFragment> }

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, "query"> = {}) {
	return Urql.useQuery<PostsQuery>({ query: Operations.PostsDocument, ...options })
}
