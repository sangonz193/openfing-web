/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../graphql/remoteSchema.types"

import * as Operations from "./EditCourseClassLiveStateForm.urqlGraphql"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CourseClassByIdQueryVariables = Types.Exact<{
	id: Types.Scalars["ID"]
}>

export type CourseClassByIdQuery = {
	courseClassById:
		| {
				__typename: "CourseClass"
				id: string
				liveState: Types.Maybe<{
					id: string
					html: Types.Maybe<string>
					inProgress: Types.Maybe<boolean>
					startDate: Types.Maybe<any>
				}>
		  }
		| { __typename: "NotFoundError" }
}

export type SetCourseClassLiveStateMutationVariables = Types.Exact<{
	input: Types.SetCourseClassLiveStateInput
}>

export type SetCourseClassLiveStateMutation = {
	setCourseClassLiveState_v2:
		| {
				__typename: "SetCourseClassLiveStatePayload"
				courseClassLiveState: Types.Maybe<{
					id: string
					courseClass: Types.Maybe<{
						id: string
						liveState: Types.Maybe<{
							id: string
							startDate: Types.Maybe<any>
							html: Types.Maybe<string>
							inProgress: Types.Maybe<boolean>
						}>
					}>
				}>
		  }
		| { __typename: "GenericError" }
		| { __typename: "AuthenticationError" }
}

export function useCourseClassByIdQuery(options: Omit<Urql.UseQueryArgs<CourseClassByIdQueryVariables>, "query"> = {}) {
	return Urql.useQuery<CourseClassByIdQuery>({ query: Operations.CourseClassByIdDocument, ...options })
}

export function useSetCourseClassLiveStateMutation() {
	return Urql.useMutation<SetCourseClassLiveStateMutation, SetCourseClassLiveStateMutationVariables>(
		Operations.SetCourseClassLiveStateDocument
	)
}
