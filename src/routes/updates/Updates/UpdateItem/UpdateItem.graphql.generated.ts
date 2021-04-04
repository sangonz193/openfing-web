/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../../../graphql/remoteSchema.types"

export type UpdateItemCourseClassFragment = {
	__typename?: "CourseClass"
	id: string
	number: Types.Maybe<number>
	publishedAt: Types.Maybe<string>
	name: Types.Maybe<string>
	courseClassList: Types.Maybe<{
		__typename?: "CourseClassList"
		id: string
		code: string
		courseEdition: Types.Maybe<{
			__typename?: "CourseEdition"
			id: string
			course: Types.Maybe<{ __typename?: "Course"; id: string; name: string; iconUrl: Types.Maybe<string> }>
		}>
	}>
}
