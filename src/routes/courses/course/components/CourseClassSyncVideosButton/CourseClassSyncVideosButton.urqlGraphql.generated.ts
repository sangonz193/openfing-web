/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../graphql/remoteSchema.types"

import * as Operations from "./CourseClassSyncVideosButton.urqlGraphql"
import * as Urql from "@/legacy-urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type SyncCourseClassVideosForClassMutationVariables = Types.Exact<{
	courseClassRef: Types.CourseClassRef
}>

export type SyncCourseClassVideosForClassMutation = {
	syncCourseClassVideosForClass: Types.Maybe<
		| {
				__typename: "SyncCourseClassVideosForClassPayload"
				courseClass: {
					id: string
					videos: Array<{
						id: string
						name: Types.Maybe<string>
						qualities: Array<{
							id: string
							formats: Array<{
								id: string
								quality: Types.Maybe<{ id: string }>
							}>
						}>
					}>
				}
		  }
		| { __typename: "NotFoundError" }
		| { __typename: "AuthenticationError" }
		| { __typename: "GenericError" }
	>
}

export function useSyncCourseClassVideosForClassMutation() {
	return Urql.useMutation<SyncCourseClassVideosForClassMutation, SyncCourseClassVideosForClassMutationVariables>(
		Operations.SyncCourseClassVideosForClassDocument
	)
}
