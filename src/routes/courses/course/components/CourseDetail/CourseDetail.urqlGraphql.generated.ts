/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../graphql/remoteSchema.types"

import * as Operations from "./CourseDetail.urqlGraphql"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CourseClassListByIdQueryVariables = Types.Exact<{
	id: Types.Scalars["ID"]
}>

export type CourseClassListByIdQuery = {
	courseClassListById:
		| {
				__typename: "CourseClassList"
				id: string
				courseEdition: Types.Maybe<{
					id: string
					course: Types.Maybe<{ id: string; iconUrl: Types.Maybe<string> }>
				}>
		  }
		| { __typename: "NotFoundError" }
}

export type CourseClassByIdQueryVariables = Types.Exact<{
	id: Types.Scalars["ID"]
}>

export type CourseClassByIdQuery = {
	courseClassById:
		| {
				__typename: "CourseClass"
				id: string
				name: Types.Maybe<string>
				publishedAt: Types.Maybe<any>
				videos: Array<{
					id: string
					name: Types.Maybe<string>
					qualities: Array<{
						id: string
						formats: Array<{
							id: string
							name: Types.Maybe<string>
							url: Types.Maybe<string>
							hasTorrent: Types.Maybe<boolean>
						}>
					}>
				}>
				liveState: Types.Maybe<{
					id: string
					startDate: Types.Maybe<any>
					html: Types.Maybe<string>
					inProgress: Types.Maybe<boolean>
					courseClass: Types.Maybe<{ id: string }>
				}>
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

export function useCourseClassListByIdQuery(
	options: Omit<Urql.UseQueryArgs<CourseClassListByIdQueryVariables | undefined>, "query">
) {
	return Urql.useQuery<CourseClassListByIdQuery>({ query: Operations.CourseClassListByIdDocument, ...options })
}

export function useCourseClassByIdQuery(
	options: Omit<Urql.UseQueryArgs<CourseClassByIdQueryVariables | undefined>, "query">
) {
	return Urql.useQuery<CourseClassByIdQuery>({ query: Operations.CourseClassByIdDocument, ...options })
}
