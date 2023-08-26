/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	ISODate: string
	ISODateTime: string
	/** The `Upload` scalar type represents a file upload. */
	Upload: any
	Void: undefined
}

export type AllowedEmail = {
	__typename: "AllowedEmail"
	id: Scalars["ID"]
	emailAddress: Scalars["String"]
}

export type AuthenticationError = {
	__typename: "AuthenticationError"
	_?: Maybe<Scalars["Void"]>
}

export type CacheControlScope = "PUBLIC" | "PRIVATE"

export type Course = {
	__typename: "Course"
	id: Scalars["ID"]
	code: Scalars["String"]
	name: Scalars["String"]
	iconUrl?: Maybe<Scalars["String"]>
	eva?: Maybe<Scalars["String"]>
	visibility?: Maybe<CourseVisibility>
	editions: Array<CourseEdition>
	createdAt?: Maybe<Scalars["ISODate"]>
	updatedAt?: Maybe<Scalars["ISODate"]>
	deletedAt?: Maybe<Scalars["ISODate"]>
	createdBy?: Maybe<User>
	updatedBy?: Maybe<User>
	deletedBy?: Maybe<User>
}

export type CourseByCodeResult = Course | NotFoundError

export type CourseByIdResult = Course | NotFoundError

export type CourseClass = {
	__typename: "CourseClass"
	id: Scalars["ID"]
	number?: Maybe<Scalars["Int"]>
	name?: Maybe<Scalars["String"]>
	liveState?: Maybe<CourseClassLiveState>
	videos: Array<CourseClassVideo>
	chapterCues: Array<CourseClassChapterCue>
	courseClassList?: Maybe<CourseClassList>
	visibility?: Maybe<CourseClassVisibility>
	publishedAt?: Maybe<Scalars["ISODate"]>
	createdAt?: Maybe<Scalars["ISODate"]>
	updatedAt?: Maybe<Scalars["ISODate"]>
	createdBy?: Maybe<User>
	updatedBy?: Maybe<User>
}

export type CourseClassByIdResult = CourseClass | NotFoundError

export type CourseClassChapterCue = {
	__typename: "CourseClassChapterCue"
	id: Scalars["ID"]
	name: Scalars["String"]
	startSeconds: Scalars["Float"]
	endSeconds: Scalars["Float"]
	courseClass?: Maybe<CourseClass>
	createdAt?: Maybe<Scalars["ISODate"]>
	updatedAt?: Maybe<Scalars["ISODate"]>
	deletedAt?: Maybe<Scalars["ISODate"]>
	createdBy?: Maybe<User>
	deletedBy?: Maybe<User>
	updatedBy?: Maybe<User>
}

export type CourseClassList = {
	__typename: "CourseClassList"
	id: Scalars["ID"]
	code: Scalars["String"]
	name?: Maybe<Scalars["String"]>
	classes?: Maybe<Array<CourseClass>>
	courseEdition?: Maybe<CourseEdition>
	createdAt?: Maybe<Scalars["ISODate"]>
	updatedAt?: Maybe<Scalars["ISODate"]>
	deletedAt?: Maybe<Scalars["ISODate"]>
	createdBy?: Maybe<User>
	updatedBy?: Maybe<User>
	deletedBy?: Maybe<User>
}

export type CourseClassListByCodeResult = CourseClassList | NotFoundError

export type CourseClassListByIdResult = CourseClassList | NotFoundError

export type CourseClassListRef = {
	byId?: Maybe<CourseClassListRefById>
	byCode?: Maybe<CourseClassListRefByCode>
}

export type CourseClassListRefByCode = {
	code: Scalars["String"]
}

export type CourseClassListRefById = {
	id: Scalars["ID"]
}

export type CourseClassLiveState = {
	__typename: "CourseClassLiveState"
	id: Scalars["ID"]
	html?: Maybe<Scalars["String"]>
	inProgress?: Maybe<Scalars["Boolean"]>
	startDate?: Maybe<Scalars["ISODate"]>
	courseClass?: Maybe<CourseClass>
}

export type CourseClassRef = {
	byId?: Maybe<CourseClassRefById>
	byNumber?: Maybe<CourseClassRefByNumber>
}

export type CourseClassRefById = {
	id: Scalars["ID"]
}

export type CourseClassRefByNumber = {
	courseClassList: CourseClassListRef
	number: Scalars["Int"]
}

export type CourseClassVideo = {
	__typename: "CourseClassVideo"
	id: Scalars["ID"]
	name?: Maybe<Scalars["String"]>
	qualities: Array<CourseClassVideoQuality>
	courseClass?: Maybe<CourseClass>
	createdAt?: Maybe<Scalars["ISODate"]>
	updatedAt?: Maybe<Scalars["ISODate"]>
	deletedAt?: Maybe<Scalars["ISODate"]>
	createdBy?: Maybe<User>
	deletedBy?: Maybe<User>
	updatedBy?: Maybe<User>
}

export type CourseClassVideoFormat = {
	__typename: "CourseClassVideoFormat"
	id: Scalars["ID"]
	name?: Maybe<Scalars["String"]>
	url?: Maybe<Scalars["String"]>
	hasTorrent?: Maybe<Scalars["Boolean"]>
	quality?: Maybe<CourseClassVideoQuality>
	createdAt?: Maybe<Scalars["ISODate"]>
	updatedAt?: Maybe<Scalars["ISODate"]>
	deletedAt?: Maybe<Scalars["ISODate"]>
	createdBy?: Maybe<User>
	deletedBy?: Maybe<User>
	updatedBy?: Maybe<User>
}

export type CourseClassVideoQuality = {
	__typename: "CourseClassVideoQuality"
	id: Scalars["ID"]
	height?: Maybe<Scalars["Int"]>
	width?: Maybe<Scalars["Int"]>
	video?: Maybe<CourseClassVideo>
	formats: Array<CourseClassVideoFormat>
	createdAt?: Maybe<Scalars["ISODate"]>
	updatedAt?: Maybe<Scalars["ISODate"]>
	deletedAt?: Maybe<Scalars["ISODate"]>
	createdBy?: Maybe<User>
	deletedBy?: Maybe<User>
	updatedBy?: Maybe<User>
}

export type CourseClassVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type CourseEdition = {
	__typename: "CourseEdition"
	id: Scalars["ID"]
	name?: Maybe<Scalars["String"]>
	semester?: Maybe<Scalars["Int"]>
	year?: Maybe<Scalars["Int"]>
	courseClassLists: Array<CourseClassList>
	course?: Maybe<Course>
	createdAt?: Maybe<Scalars["ISODate"]>
	updatedAt?: Maybe<Scalars["ISODate"]>
	deletedAt?: Maybe<Scalars["ISODate"]>
	createdBy?: Maybe<User>
	updatedBy?: Maybe<User>
	deletedBy?: Maybe<User>
}

export type CourseEditionByIdResult = CourseEdition | NotFoundError

export type CourseRef = {
	byId?: Maybe<CourseRefById>
	byCode?: Maybe<CourseRefByCode>
}

export type CourseRefByCode = {
	code: Scalars["String"]
}

export type CourseRefById = {
	id: Scalars["ID"]
}

export type CourseVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type CreateCourseClassChapterCueDataInput = {
	name: Scalars["String"]
	startSeconds: Scalars["Float"]
	endSeconds: Scalars["Float"]
}

export type CreateCourseClassChapterCueInput = {
	courseClassRef: CourseClassRef
	data: CreateCourseClassChapterCueDataInput
}

export type CreateCourseClassChapterCuePayload = {
	__typename: "CreateCourseClassChapterCuePayload"
	courseClassChapterCue: CourseClassChapterCue
}

export type CreateCourseClassChapterCueResult =
	| CreateCourseClassChapterCuePayload
	| AuthenticationError
	| GenericError
	| NotFoundError

export type CreateCourseClassInput = {
	courseClassListRef: CourseClassListRef
	name: Scalars["String"]
	number: Scalars["Int"]
	visibility?: Maybe<CreateCourseClassInputVisibility>
}

export type CreateCourseClassInputVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type CreateCourseClassListInput = {
	courseCode: Scalars["String"]
	code: Scalars["String"]
	name: Scalars["String"]
	semester: Scalars["Int"]
	year: Scalars["Int"]
	visibility?: Maybe<CreateCourseClassListInputVisibility>
}

export type CreateCourseClassListInputVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type CreateCourseClassListPayload = {
	__typename: "CreateCourseClassListPayload"
	courseClassList: CourseClassList
}

export type CreateCourseClassListResult = CreateCourseClassListPayload | GenericError | AuthenticationError

export type CreateCourseClassPayload = {
	__typename: "CreateCourseClassPayload"
	courseClass: CourseClass
}

export type CreateCourseClassResult = CreateCourseClassPayload | GenericError | AuthenticationError

export type CreateCourseInput = {
	code: Scalars["String"]
	name: Scalars["String"]
	eva?: Maybe<Scalars["String"]>
	visibility?: Maybe<CreateCourseInputVisibility>
}

export type CreateCourseInputVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type CreateCoursePayload = {
	__typename: "CreateCoursePayload"
	course: Course
}

export type CreateCourseResult = CreateCoursePayload | GenericError | AuthenticationError

export type CreatePostInput = {
	title: Scalars["String"]
	mdContent: Scalars["String"]
	publishedAt?: Maybe<Scalars["ISODateTime"]>
}

export type CreatePostPayload = {
	__typename: "CreatePostPayload"
	post: Post
}

export type CreatePostResult = CreatePostPayload | GenericError | AuthenticationError

export type DeleteCourseClassChapterCuesFromCourseClassInput = {
	courseClassRef: CourseClassRef
}

export type DeleteCourseClassChapterCuesFromCourseClassPayload = {
	__typename: "DeleteCourseClassChapterCuesFromCourseClassPayload"
	courseClass: CourseClass
}

export type DeleteCourseClassChapterCuesFromCourseClassResult =
	| DeleteCourseClassChapterCuesFromCourseClassPayload
	| GenericError
	| NotFoundError
	| AuthenticationError

export type DeletePostPayload = {
	__typename: "DeletePostPayload"
	deleted: Scalars["Boolean"]
}

export type DeletePostResult = DeletePostPayload | GenericError | AuthenticationError | NotFoundError

export type EmailNotValidatedError = {
	__typename: "EmailNotValidatedError"
	_?: Maybe<Scalars["Void"]>
}

export type Faq = {
	__typename: "Faq"
	id: Scalars["ID"]
	title: Scalars["String"]
	content: Scalars["String"]
	isHtml?: Maybe<Scalars["Boolean"]>
	createdAt?: Maybe<Scalars["ISODate"]>
	createdBy?: Maybe<User>
	updatedAt?: Maybe<Scalars["ISODate"]>
	updatedBy?: Maybe<User>
	deletedAt?: Maybe<Scalars["ISODate"]>
	deletedBy?: Maybe<User>
}

export type GenerateLegacyJsonFilesPayload = {
	__typename: "GenerateLegacyJsonFilesPayload"
	modifiedFilesCount?: Maybe<Scalars["Int"]>
}

export type GenerateLegacyJsonFilesResult = GenericError | GenerateLegacyJsonFilesPayload

export type GenericError = {
	__typename: "GenericError"
	_?: Maybe<Scalars["Void"]>
}

export type Grant = {
	__typename: "Grant"
	token: Scalars["String"]
	refreshToken: Scalars["String"]
}

export type InvalidEmailDomain = {
	__typename: "InvalidEmailDomain"
	_?: Maybe<Scalars["Void"]>
}

export type InvalidEmailDomainError = {
	__typename: "InvalidEmailDomainError"
	_?: Maybe<Scalars["Void"]>
}

export type InvalidFormatError = {
	__typename: "InvalidFormatError"
	_?: Maybe<Scalars["Void"]>
}

export type MaxLengthError = {
	__typename: "MaxLengthError"
	max: Scalars["Int"]
}

export type MinLengthError = {
	__typename: "MinLengthError"
	min: Scalars["Int"]
}

export type Mutation = {
	__typename: "Mutation"
	_?: Maybe<Scalars["Void"]>
	backupDb?: Maybe<Scalars["Void"]>
	backup?: Maybe<Scalars["Void"]>
	createCourseClassChapterCue: CreateCourseClassChapterCueResult
	createCourseClassList: CreateCourseClassListResult
	createCourseClassList_v2: CreateCourseClassListResult
	createCourseClass: CreateCourseClassResult
	createCourseClass_v2: CreateCourseClassResult
	createCourse: CreateCourseResult
	createCourse_v2: CreateCourseResult
	createPost: CreatePostResult
	deleteCourseClassChapterCuesFromCourseClass: DeleteCourseClassChapterCuesFromCourseClassResult
	deletePost: DeletePostResult
	generateLegacyJsonFiles: GenerateLegacyJsonFilesResult
	refreshToken: RefreshTokenResult
	sendVerifyEmail: SendVerifyEmailResult
	setCourseClassLiveState: SetCourseClassLiveStateResult
	setCourseClassLiveState_v2: SetCourseClassLiveStateResult
	signIn: SignInResult
	syncCourseClassVideosForClass?: Maybe<SyncCourseClassVideosForClassResult>
	updateCourseClassList: UpdateCourseClassListResult
	updateCourseClassList_v2: UpdateCourseClassListResult
	updateCourseClass: UpdateCourseClassResult
	updateCourseClass_v2: UpdateCourseClassResult
	updateCourse: UpdateCourseResult
	updatePost: UpdatePostResult
	signUp?: Maybe<SignUpResult>
}

export type MutationBackupDbArgs = {
	secret: Scalars["String"]
}

export type MutationCreateCourseClassChapterCueArgs = {
	input: CreateCourseClassChapterCueInput
}

export type MutationCreateCourseClassListArgs = {
	input: CreateCourseClassListInput
	secret: Scalars["String"]
}

export type MutationCreateCourseClassList_V2Args = {
	input: CreateCourseClassListInput
}

export type MutationCreateCourseClassArgs = {
	input: CreateCourseClassInput
	secret: Scalars["String"]
}

export type MutationCreateCourseClass_V2Args = {
	input: CreateCourseClassInput
}

export type MutationCreateCourseArgs = {
	input: CreateCourseInput
	secret: Scalars["String"]
}

export type MutationCreateCourse_V2Args = {
	input: CreateCourseInput
}

export type MutationCreatePostArgs = {
	input: CreatePostInput
}

export type MutationDeleteCourseClassChapterCuesFromCourseClassArgs = {
	input: DeleteCourseClassChapterCuesFromCourseClassInput
}

export type MutationDeletePostArgs = {
	id: Scalars["ID"]
}

export type MutationGenerateLegacyJsonFilesArgs = {
	secret: Scalars["String"]
}

export type MutationRefreshTokenArgs = {
	input: RefreshTokenInput
}

export type MutationSendVerifyEmailArgs = {
	input: SendVerifyEmailInput
}

export type MutationSetCourseClassLiveStateArgs = {
	input: SetCourseClassLiveStateInput
	secret: Scalars["String"]
}

export type MutationSetCourseClassLiveState_V2Args = {
	input: SetCourseClassLiveStateInput
}

export type MutationSignInArgs = {
	input: SignInInput
}

export type MutationSyncCourseClassVideosForClassArgs = {
	courseClassRef: CourseClassRef
}

export type MutationUpdateCourseClassListArgs = {
	ref: CourseClassListRef
	input: UpdateCourseClassListInput
	secret: Scalars["String"]
}

export type MutationUpdateCourseClassList_V2Args = {
	ref: CourseClassListRef
	input: UpdateCourseClassListInput
}

export type MutationUpdateCourseClassArgs = {
	ref: CourseClassRef
	input: UpdateCourseClassInput
	secret: Scalars["String"]
}

export type MutationUpdateCourseClass_V2Args = {
	ref: CourseClassRef
	input: UpdateCourseClassInput
}

export type MutationUpdateCourseArgs = {
	ref: CourseRef
	input: UpdateCourseInput
}

export type MutationUpdatePostArgs = {
	id: Scalars["ID"]
	input: UpdatePostInput
}

export type MutationSignUpArgs = {
	input: SignUpInput
}

export type NotFoundError = {
	__typename: "NotFoundError"
	_?: Maybe<Scalars["Void"]>
}

export type Post = {
	__typename: "Post"
	id: Scalars["ID"]
	title: Scalars["String"]
	mdContent: Scalars["String"]
	publishedAt?: Maybe<Scalars["ISODateTime"]>
	createdAt?: Maybe<Scalars["ISODateTime"]>
	createdBy?: Maybe<User>
	updatedAt?: Maybe<Scalars["ISODateTime"]>
	updatedBy?: Maybe<User>
	deletedAt?: Maybe<Scalars["ISODateTime"]>
	deletedBy?: Maybe<User>
}

export type Query = {
	__typename: "Query"
	_?: Maybe<Scalars["Void"]>
	courseByCode: CourseByCodeResult
	courseById: CourseByIdResult
	courseClassById: CourseClassByIdResult
	posts: Array<Post>
	courseClassListByCode: CourseClassListByCodeResult
	courseClassListById: CourseClassListByIdResult
	courseEditionById: CourseEditionByIdResult
	courses: Array<Course>
	faqs: Array<Faq>
	latestCourseClasses: Array<CourseClass>
}

export type QueryCourseByCodeArgs = {
	code: Scalars["String"]
}

export type QueryCourseByIdArgs = {
	id: Scalars["ID"]
}

export type QueryCourseClassByIdArgs = {
	id: Scalars["ID"]
}

export type QueryCourseClassListByCodeArgs = {
	code: Scalars["String"]
}

export type QueryCourseClassListByIdArgs = {
	id: Scalars["ID"]
}

export type QueryCourseEditionByIdArgs = {
	id: Scalars["ID"]
}

export type RefreshTokenInput = {
	refreshToken: Scalars["String"]
}

export type RefreshTokenPayload = {
	__typename: "RefreshTokenPayload"
	grant: Grant
}

export type RefreshTokenResult = RefreshTokenPayload | GenericError | AuthenticationError

export type RequiredFieldError = {
	__typename: "RequiredFieldError"
	_?: Maybe<Scalars["Void"]>
}

export type SendVerifyEmailInput = {
	email: Scalars["String"]
}

export type SendVerifyEmailPayload = {
	__typename: "SendVerifyEmailPayload"
	_?: Maybe<Scalars["Void"]>
}

export type SendVerifyEmailResult = SendVerifyEmailPayload | GenericError

export type SetCourseClassLiveStateDataInput = {
	inProgress?: Maybe<Scalars["Boolean"]>
	html?: Maybe<Scalars["String"]>
	startDate?: Maybe<Scalars["ISODate"]>
}

export type SetCourseClassLiveStateInput = {
	courseClassRef: CourseClassRef
	data?: Maybe<SetCourseClassLiveStateDataInput>
}

export type SetCourseClassLiveStatePayload = {
	__typename: "SetCourseClassLiveStatePayload"
	courseClassLiveState?: Maybe<CourseClassLiveState>
}

export type SetCourseClassLiveStateResult = SetCourseClassLiveStatePayload | GenericError | AuthenticationError

export type SignInEmailError = RequiredFieldError | InvalidFormatError

export type SignInInput = {
	email: Scalars["String"]
	password: Scalars["String"]
}

export type SignInPasswordError = RequiredFieldError

export type SignInPayload = {
	__typename: "SignInPayload"
	grant: Grant
}

export type SignInResult =
	| SignInPayload
	| GenericError
	| AuthenticationError
	| SignInValidationErrors
	| EmailNotValidatedError

export type SignInValidationErrors = {
	__typename: "SignInValidationErrors"
	email?: Maybe<Array<SignInEmailError>>
	password?: Maybe<Array<SignInPasswordError>>
}

export type SignUpEmailError = RequiredFieldError | InvalidEmailDomainError | InvalidFormatError | MaxLengthError

export type SignUpEmailNotSentPayload = {
	__typename: "SignUpEmailNotSentPayload"
	issueId: Scalars["String"]
}

export type SignUpFirstNameError = RequiredFieldError | MinLengthError | MaxLengthError

export type SignUpInput = {
	firstName: Scalars["String"]
	lastName?: Maybe<Scalars["String"]>
	email: Scalars["String"]
	password: Scalars["String"]
}

export type SignUpLastNameError = MaxLengthError

export type SignUpPasswordError = RequiredFieldError | MinLengthError | MaxLengthError

export type SignUpResult = GenericError | AuthenticationError | SignUpValidationErrors | SignUpEmailNotSentPayload

export type SignUpValidationErrors = {
	__typename: "SignUpValidationErrors"
	email?: Maybe<Array<SignUpEmailError>>
	firstName?: Maybe<Array<SignUpFirstNameError>>
	lastName?: Maybe<Array<SignUpLastNameError>>
	password?: Maybe<Array<SignUpPasswordError>>
}

export type SyncCourseClassVideosForClassPayload = {
	__typename: "SyncCourseClassVideosForClassPayload"
	courseClass: CourseClass
}

export type SyncCourseClassVideosForClassResult =
	| SyncCourseClassVideosForClassPayload
	| NotFoundError
	| AuthenticationError
	| GenericError

export type UpdateCourseClassInput = {
	name?: Maybe<Scalars["String"]>
	number?: Maybe<Scalars["Int"]>
	publishedAt?: Maybe<Scalars["ISODate"]>
	visibility?: Maybe<UpdateCourseClassInputVisibility>
}

export type UpdateCourseClassInputVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type UpdateCourseClassListInput = {
	name?: Maybe<Scalars["String"]>
	visibility?: Maybe<UpdateCourseClassListInputVisibility>
}

export type UpdateCourseClassListInputVisibility = "PUBLIC" | "HIDDEN" | "DISABLED"

export type UpdateCourseClassListPayload = {
	__typename: "UpdateCourseClassListPayload"
	courseClassList: CourseClassList
}

export type UpdateCourseClassListResult =
	| UpdateCourseClassListPayload
	| GenericError
	| AuthenticationError
	| NotFoundError

export type UpdateCourseClassPayload = {
	__typename: "UpdateCourseClassPayload"
	courseClass: CourseClass
}

export type UpdateCourseClassResult = UpdateCourseClassPayload | GenericError | AuthenticationError | NotFoundError

export type UpdateCourseInput = {
	name?: Maybe<Scalars["String"]>
	visibility?: Maybe<CourseVisibility>
	code?: Maybe<Scalars["String"]>
	eva?: Maybe<Scalars["String"]>
}

export type UpdateCoursePayload = {
	__typename: "UpdateCoursePayload"
	course: Course
}

export type UpdateCourseResult = UpdateCoursePayload | GenericError | AuthenticationError | NotFoundError

export type UpdatePostInput = {
	title: Scalars["String"]
	mdContent: Scalars["String"]
	publishedAt?: Maybe<Scalars["ISODateTime"]>
}

export type UpdatePostPayload = {
	__typename: "UpdatePostPayload"
	post: Post
}

export type UpdatePostResult = UpdatePostPayload | GenericError | AuthenticationError | NotFoundError

export type User = {
	__typename: "User"
	id: Scalars["ID"]
	name: Scalars["String"]
	givenName: Scalars["String"]
	familyName?: Maybe<Scalars["String"]>
}
