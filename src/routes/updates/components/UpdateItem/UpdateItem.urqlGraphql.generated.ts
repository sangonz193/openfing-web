/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../graphql/remoteSchema.types"

export type UpdateItemCourseClassFragment = {
	id: string
	number: Types.Maybe<number>
	publishedAt: Types.Maybe<any>
	name: Types.Maybe<string>
	liveState: Types.Maybe<{
		id: string
		startDate: Types.Maybe<any>
		inProgress: Types.Maybe<boolean>
		courseClass: Types.Maybe<{ id: string }>
	}>
	courseClassList: Types.Maybe<{
		id: string
		code: string
		courseEdition: Types.Maybe<{
			id: string
			course: Types.Maybe<{ id: string; name: string; iconUrl: Types.Maybe<string> }>
		}>
	}>
}
