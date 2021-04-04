/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../graphql/remoteSchema.types"

export type CourseSelectionCourseClassListByCodeWithIdFragment = {
	__typename?: "CourseClassList"
	id: string
	code: string
}

export type CourseSelectionCourseClassListByCodeWithClassesFragment = {
	__typename?: "CourseClassList"
	id: string
	code: string
	classes: Types.Maybe<Array<{ __typename?: "CourseClass"; id: string; number: Types.Maybe<number> }>>
}
