/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../graphql/remoteSchema.types"

import * as Operations from "./UpdateCourseClassChapterCuesForm.urqlGraphql"
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
				chapterCues: Array<{
					id: string
					name: string
					startSeconds: number
					endSeconds: number
					courseClass: Types.Maybe<{ id: string }>
				}>
		  }
		| { __typename: "NotFoundError" }
}

export type CreateCourseClassChapterCueMutationVariables = Types.Exact<{
	input: Types.CreateCourseClassChapterCueInput
}>

export type CreateCourseClassChapterCueMutation = {
	createCourseClassChapterCue:
		| {
				__typename: "CreateCourseClassChapterCuePayload"
				courseClassChapterCue: {
					id: string
					name: string
					startSeconds: number
					endSeconds: number
					courseClass: Types.Maybe<{
						id: string
						chapterCues: Array<{ id: string }>
					}>
				}
		  }
		| { __typename: "AuthenticationError" }
		| { __typename: "GenericError" }
		| { __typename: "NotFoundError" }
}

export type DeleteCourseClassChapterCuesFromCourseClassMutationVariables = Types.Exact<{
	input: Types.DeleteCourseClassChapterCuesFromCourseClassInput
}>

export type DeleteCourseClassChapterCuesFromCourseClassMutation = {
	deleteCourseClassChapterCuesFromCourseClass:
		| {
				__typename: "DeleteCourseClassChapterCuesFromCourseClassPayload"
				courseClass: {
					id: string
					chapterCues: Array<{
						id: string
						name: string
						startSeconds: number
						endSeconds: number
						courseClass: Types.Maybe<{ id: string }>
					}>
				}
		  }
		| { __typename: "GenericError" }
		| { __typename: "NotFoundError" }
		| { __typename: "AuthenticationError" }
}

export function useCourseClassByIdQuery(options: Omit<Urql.UseQueryArgs<CourseClassByIdQueryVariables>, "query">) {
	return Urql.useQuery<CourseClassByIdQuery>({ query: Operations.CourseClassByIdDocument, ...options })
}

export function useCreateCourseClassChapterCueMutation() {
	return Urql.useMutation<CreateCourseClassChapterCueMutation, CreateCourseClassChapterCueMutationVariables>(
		Operations.CreateCourseClassChapterCueDocument
	)
}

export function useDeleteCourseClassChapterCuesFromCourseClassMutation() {
	return Urql.useMutation<
		DeleteCourseClassChapterCuesFromCourseClassMutation,
		DeleteCourseClassChapterCuesFromCourseClassMutationVariables
	>(Operations.DeleteCourseClassChapterCuesFromCourseClassDocument)
}
