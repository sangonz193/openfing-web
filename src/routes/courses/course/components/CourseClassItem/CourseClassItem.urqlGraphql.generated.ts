/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../../graphql/remoteSchema.types"

export type CourseClassItemCourseClassFragment = {
	id: string
	name: Types.Maybe<string>
	number: Types.Maybe<number>
	liveState: Types.Maybe<{
		id: string
		startDate: Types.Maybe<any>
		inProgress: Types.Maybe<boolean>
		courseClass: Types.Maybe<{ id: string }>
	}>
	courseClassList: Types.Maybe<{ id: string; code: string }>
}
