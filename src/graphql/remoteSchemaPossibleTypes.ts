/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

export const possibleTypes = {
	CourseByCodeResult: ["Course", "NotFoundError"],
	CourseByIdResult: ["Course", "NotFoundError"],
	CourseClassByIdResult: ["CourseClass", "NotFoundError"],
	CourseClassListByCodeResult: ["CourseClassList", "NotFoundError"],
	CourseClassListByIdResult: ["CourseClassList", "NotFoundError"],
	CourseEditionByIdResult: ["CourseEdition", "NotFoundError"],
	CreateCourseClassResult: ["CreateCourseClassPayload", "GenericError", "AuthenticationError"],
	CreateCourseClassListResult: ["CreateCourseClassListPayload", "GenericError", "AuthenticationError"],
	CreateCourseResult: ["CreateCoursePayload", "GenericError", "AuthenticationError"],
	SetCourseClassLiveStateResult: ["SetCourseClassLiveStatePayload", "GenericError", "AuthenticationError"],
	UpdateCourseClassResult: ["UpdateCourseClassPayload", "GenericError", "AuthenticationError", "NotFoundError"],
	UpdateCourseClassListResult: [
		"UpdateCourseClassListPayload",
		"GenericError",
		"AuthenticationError",
		"NotFoundError",
	],
	UserFromSecretResult: ["UserFromSecretPayload", "AuthenticationError"],
}
