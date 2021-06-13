/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

export const possibleTypes = {
	CreateCourseClassListResult: ["CreateCourseClassListPayload", "GenericError", "AuthenticationError"],
	CreateCourseClassResult: ["CreateCourseClassPayload", "GenericError", "AuthenticationError"],
	CreateCourseResult: ["CreateCoursePayload", "GenericError", "AuthenticationError"],
	SetCourseClassLiveStateResult: ["SetCourseClassLiveStatePayload", "GenericError", "AuthenticationError"],
	SignInEmailError: ["RequiredFieldError", "InvalidFormatError"],
	SignInPasswordError: ["RequiredFieldError"],
	SignInResult: ["SignInPayload", "GenericError", "AuthenticationError", "SignInValidationErrors"],
	UpdateCourseClassListResult: [
		"UpdateCourseClassListPayload",
		"GenericError",
		"AuthenticationError",
		"NotFoundError",
	],
	UpdateCourseClassResult: ["UpdateCourseClassPayload", "GenericError", "AuthenticationError", "NotFoundError"],
	UserFromSecretResult: ["UserFromSecretPayload", "AuthenticationError"],
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
	SignUpResult: ["GenericError", "AuthenticationError", "SignUpValidationErrors"],
}
