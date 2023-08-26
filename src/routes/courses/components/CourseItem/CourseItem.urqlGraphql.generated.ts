/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../graphql/remoteSchema.types"

export type CourseItemCourseFragment = {
	id: string
	code: string
	name: string
	eva: Types.Maybe<string>
	iconUrl: Types.Maybe<string>
	editions: Array<{
		id: string
		year: Types.Maybe<number>
		courseClassLists: Array<{ id: string; code: string }>
	}>
}
