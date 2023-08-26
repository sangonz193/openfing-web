/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import * as Types from "../../graphql/remoteSchema.types"

export type CourseSelectionCourseClassListByCodeWithIdFragment = {
	id: string
	code: string
}

export type CourseSelectionCourseClassListByCodeWithClassesFragment = {
	id: string
	code: string
	classes: Types.Maybe<Array<{ id: string; number: Types.Maybe<number> }>>
}
