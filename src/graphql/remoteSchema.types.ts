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
	/** The `Upload` scalar type represents a file upload. */
	Upload: any
	Void: any
}

export type AuthenticationError = {
	__typename: "AuthenticationError"
	_?: Maybe<Scalars["Void"]>
}

export type CacheControlScope = "PUBLIC" | "PRIVATE"

export type ConnectionOrderDirection = "ASC" | "DESC"

export type ConnectionPageInfo = {
	__typename: "ConnectionPageInfo"
	hasNextPage: Scalars["Boolean"]
	endCursor?: Maybe<Scalars["String"]>
}

export type Course = {
	__typename: "Course"
	id: Scalars["ID"]
	code: Scalars["String"]
	name: Scalars["String"]
	iconUrl?: Maybe<Scalars["String"]>
	eva?: Maybe<Scalars["String"]>
	editions: CourseEdition[]
	createdAt?: Maybe<Scalars["String"]>
	updatedAt?: Maybe<Scalars["String"]>
	deletedAt?: Maybe<Scalars["String"]>
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
	videos: CourseClassVideo[]
	chapterCues: CourseClassChapterCue[]
	courseClassList?: Maybe<CourseClassList>
	publishedAt?: Maybe<Scalars["String"]>
	createdAt?: Maybe<Scalars["String"]>
	updatedAt?: Maybe<Scalars["String"]>
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
	createdAt?: Maybe<Scalars["String"]>
	updatedAt?: Maybe<Scalars["String"]>
	deletedAt?: Maybe<Scalars["String"]>
	createdBy?: Maybe<User>
	deletedBy?: Maybe<User>
	updatedBy?: Maybe<User>
}

export type CourseClassList = {
	__typename: "CourseClassList"
	id: Scalars["ID"]
	code: Scalars["String"]
	name?: Maybe<Scalars["String"]>
	classes?: Maybe<CourseClass[]>
	courseEdition?: Maybe<CourseEdition>
	createdAt?: Maybe<Scalars["String"]>
	updatedAt?: Maybe<Scalars["String"]>
	deletedAt?: Maybe<Scalars["String"]>
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
	qualities: CourseClassVideoQuality[]
	courseClass?: Maybe<CourseClass>
	createdAt?: Maybe<Scalars["String"]>
	updatedAt?: Maybe<Scalars["String"]>
	deletedAt?: Maybe<Scalars["String"]>
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
	createdAt?: Maybe<Scalars["String"]>
	updatedAt?: Maybe<Scalars["String"]>
	deletedAt?: Maybe<Scalars["String"]>
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
	formats: CourseClassVideoFormat[]
	createdAt?: Maybe<Scalars["String"]>
	updatedAt?: Maybe<Scalars["String"]>
	deletedAt?: Maybe<Scalars["String"]>
	createdBy?: Maybe<User>
	deletedBy?: Maybe<User>
	updatedBy?: Maybe<User>
}

export type CourseEdition = {
	__typename: "CourseEdition"
	id: Scalars["ID"]
	name?: Maybe<Scalars["String"]>
	semester?: Maybe<Scalars["Int"]>
	year?: Maybe<Scalars["Int"]>
	courseClassLists: CourseClassList[]
	course?: Maybe<Course>
	createdAt?: Maybe<Scalars["String"]>
	updatedAt?: Maybe<Scalars["String"]>
	deletedAt?: Maybe<Scalars["String"]>
	createdBy?: Maybe<User>
	updatedBy?: Maybe<User>
	deletedBy?: Maybe<User>
}

export type CourseEditionByIdResult = CourseEdition | NotFoundError

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

export type Faq = {
	__typename: "Faq"
	id: Scalars["ID"]
	title: Scalars["String"]
	content: Scalars["String"]
	isHtml?: Maybe<Scalars["Boolean"]>
	createdAt?: Maybe<Scalars["String"]>
	createdBy?: Maybe<User>
	updatedAt?: Maybe<Scalars["String"]>
	updatedBy?: Maybe<User>
	deletedAt?: Maybe<Scalars["String"]>
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

export type Mutation = {
	__typename: "Mutation"
	_?: Maybe<Scalars["Void"]>
	backupDb?: Maybe<Scalars["Void"]>
	createCourseClass: CreateCourseClassResult
	createCourseClassList: CreateCourseClassListResult
	createCourse: CreateCourseResult
	generateLegacyJsonFiles: GenerateLegacyJsonFilesResult
	resetDatabaseFromBackup?: Maybe<Scalars["String"]>
	updateCourseClass: UpdateCourseClassResult
	updateCourseClassList: UpdateCourseClassListResult
	updateCourseClassVideos?: Maybe<NotFoundError>
}

export type MutationBackupDbArgs = {
	secret: Scalars["String"]
}

export type MutationCreateCourseClassArgs = {
	input: CreateCourseClassInput
	secret: Scalars["String"]
}

export type MutationCreateCourseClassListArgs = {
	input: CreateCourseClassListInput
	secret: Scalars["String"]
}

export type MutationCreateCourseArgs = {
	input: CreateCourseInput
	secret: Scalars["String"]
}

export type MutationGenerateLegacyJsonFilesArgs = {
	secret: Scalars["String"]
}

export type MutationResetDatabaseFromBackupArgs = {
	secret: Scalars["String"]
}

export type MutationUpdateCourseClassArgs = {
	ref: CourseClassRef
	input: UpdateCourseClassInput
	secret: Scalars["String"]
}

export type MutationUpdateCourseClassListArgs = {
	ref: CourseClassListRef
	input: UpdateCourseClassListInput
	secret: Scalars["String"]
}

export type MutationUpdateCourseClassVideosArgs = {
	courseClassId: Scalars["ID"]
	secret: Scalars["String"]
}

export type NotFoundError = {
	__typename: "NotFoundError"
	_?: Maybe<Scalars["Void"]>
}

export type Post = {
	__typename: "Post"
	id: Scalars["ID"]
	title: Scalars["String"]
	content: Scalars["String"]
	htmlContent: Scalars["String"]
	shortContent: Scalars["String"]
	createdAt?: Maybe<Scalars["String"]>
	createdBy?: Maybe<User>
	updatedAt?: Maybe<Scalars["String"]>
	updatedBy?: Maybe<User>
	deletedAt?: Maybe<Scalars["String"]>
	deletedBy?: Maybe<User>
}

export type PostConnection = {
	__typename: "PostConnection"
	edges: PostEdge[]
	pageInfo: ConnectionPageInfo
	totalCount: Scalars["Int"]
}

export type PostEdge = {
	__typename: "PostEdge"
	node: Post
	cursor: Scalars["String"]
}

export type PostOrder = {
	field: PostOrderField
	direction: ConnectionOrderDirection
}

export type PostOrderField = "PUBLISHED_AT"

export type Query = {
	__typename: "Query"
	_?: Maybe<Scalars["Void"]>
	courseByCode: CourseByCodeResult
	courseById: CourseByIdResult
	courseClassById: CourseClassByIdResult
	courseClassListByCode: CourseClassListByCodeResult
	courseClassListById: CourseClassListByIdResult
	courseEditionById: CourseEditionByIdResult
	courses: Course[]
	faqs: Faq[]
	latestCourseClasses: CourseClass[]
	posts: PostConnection
	userRoles: UserRole[]
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

export type QueryPostsArgs = {
	orderBy?: Maybe<PostOrder>
	first?: Maybe<Scalars["Int"]>
	offset?: Maybe<Scalars["Int"]>
	after?: Maybe<Scalars["String"]>
}

export type UpdateCourseClassInput = {
	name?: Maybe<Scalars["String"]>
	number?: Maybe<Scalars["Int"]>
	publishedAt?: Maybe<Scalars["String"]>
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

export type User = {
	__typename: "User"
	id: Scalars["ID"]
	email: Scalars["String"]
	name?: Maybe<Scalars["String"]>
	uid?: Maybe<Scalars["String"]>
	roles: UserRole[]
	createdAt?: Maybe<Scalars["String"]>
	updatedAt?: Maybe<Scalars["String"]>
	deletedAt?: Maybe<Scalars["String"]>
}

export type UserRole = {
	__typename: "UserRole"
	id: Scalars["ID"]
	code: Scalars["String"]
}
