/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import { CourseClassPlayerVideoCourseClassVideoFormatFragment } from "../CourseClassPlayerVideo/CourseClassPlayerVideo.urqlGraphql.generated"
export type CourseClassPlayerCourseClassVideoFragment = {
	id: string
	qualities: Array<{
		id: string
		formats: Array<{ id: string } & CourseClassPlayerVideoCourseClassVideoFormatFragment>
	}>
}
