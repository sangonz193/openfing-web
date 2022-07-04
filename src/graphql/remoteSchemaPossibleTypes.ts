/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

export const possibleTypes = {
	CreateCourseClassChapterCueResult: [
		"CreateCourseClassChapterCuePayload",
		"AuthenticationError",
		"GenericError",
		"NotFoundError",
	],
	CreateCourseClassListResult: ["CreateCourseClassListPayload", "GenericError", "AuthenticationError"],
	CreateCourseClassResult: ["CreateCourseClassPayload", "GenericError", "AuthenticationError"],
	CreateCourseResult: ["CreateCoursePayload", "GenericError", "AuthenticationError"],
	CreatePostResult: ["CreatePostPayload", "GenericError", "AuthenticationError"],
	DeleteCourseClassChapterCuesFromCourseClassResult: [
		"DeleteCourseClassChapterCuesFromCourseClassPayload",
		"GenericError",
		"NotFoundError",
		"AuthenticationError",
	],
	DeletePostResult: ["DeletePostPayload", "GenericError", "AuthenticationError", "NotFoundError"],
	GenerateLegacyJsonFilesResult: ["GenericError", "GenerateLegacyJsonFilesPayload"],
	RefreshTokenResult: ["RefreshTokenPayload", "GenericError", "AuthenticationError"],
	SendVerifyEmailResult: ["SendVerifyEmailPayload", "GenericError"],
	SetCourseClassLiveStateResult: ["SetCourseClassLiveStatePayload", "GenericError", "AuthenticationError"],
	SignInEmailError: ["RequiredFieldError", "InvalidFormatError"],
	SignInPasswordError: ["RequiredFieldError"],
	SignInResult: [
		"SignInPayload",
		"GenericError",
		"AuthenticationError",
		"SignInValidationErrors",
		"EmailNotValidatedError",
	],
	SyncCourseClassVideosForClassResult: [
		"SyncCourseClassVideosForClassPayload",
		"NotFoundError",
		"AuthenticationError",
		"GenericError",
	],
	UpdateCourseClassListResult: [
		"UpdateCourseClassListPayload",
		"GenericError",
		"AuthenticationError",
		"NotFoundError",
	],
	UpdateCourseClassResult: ["UpdateCourseClassPayload", "GenericError", "AuthenticationError", "NotFoundError"],
	UpdateCourseResult: ["UpdateCoursePayload", "GenericError", "AuthenticationError", "NotFoundError"],
	UpdatePostResult: ["UpdatePostPayload", "GenericError", "AuthenticationError", "NotFoundError"],
	CourseByCodeResult: ["Course", "NotFoundError"],
	CourseByIdResult: ["Course", "NotFoundError"],
	CourseClassByIdResult: ["CourseClass", "NotFoundError"],
	CourseClassListByCodeResult: ["CourseClassList", "NotFoundError"],
	CourseClassListByIdResult: ["CourseClassList", "NotFoundError"],
	CourseEditionByIdResult: ["CourseEdition", "NotFoundError"],
	SignUpEmailError: ["RequiredFieldError", "InvalidEmailDomainError", "InvalidFormatError", "MaxLengthError"],
	SignUpFirstNameError: ["RequiredFieldError", "MinLengthError", "MaxLengthError"],
	SignUpLastNameError: ["MaxLengthError"],
	SignUpPasswordError: ["RequiredFieldError", "MinLengthError", "MaxLengthError"],
	SignUpResult: ["GenericError", "AuthenticationError", "SignUpValidationErrors", "SignUpEmailNotSentPayload"],
}
