/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../graphql/remoteSchema.types"

export type CourseItemCourseFragment = {
	__typename?: "Course"
	id: string
	code: string
	name: string
	eva: Types.Maybe<string>
	iconUrl: Types.Maybe<string>
	editions: Array<{
		__typename?: "CourseEdition"
		id: string
		year: Types.Maybe<number>
		courseClassLists: Array<{ __typename?: "CourseClassList"; id: string; code: string }>
	}>
}
