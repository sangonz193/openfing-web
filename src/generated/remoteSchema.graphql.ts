import gql from "graphql-tag";

export const remoteSchema = gql`scalar Void

type Mutation {
  _: Void
  backupDb(secret: String!): Void
  createCourse(input: CreateCourseInput!, secret: String!): CreateCourseResult!
  updateCourseClassVideos(courseClassId: ID!, secret: String!): NotFoundError
}

type GenericError {
  _: Void
}

type NotFoundError {
  _: Void
}

type AuthenticationError {
  _: Void
}

type CourseClassChapterCue {
  id: ID!
  name: String!
  startSeconds: Float!
  endSeconds: Float!
  courseClass: CourseClass
  createdAt: String
  updatedAt: String
  deletedAt: String
  createdBy: User
  deletedBy: User
  updatedBy: User
}

type CourseClass {
  id: ID!
  number: Int
  name: String
  videos: [CourseClassVideo!]!
  chapterCues: [CourseClassChapterCue!]!
  courseClassList: CourseClassList
  createdAt: String
  updatedAt: String
  deletedAt: String
  createdBy: User
  updatedBy: User
  deletedBy: User
}

type CourseClassList {
  id: ID!
  code: String!
  name: String
  classes: [CourseClass!]
  courseEdition: CourseEdition
  createdAt: String
  updatedAt: String
  deletedAt: String
  createdBy: User
  updatedBy: User
  deletedBy: User
}

type CourseClassVideo {
  id: ID!
  name: String
  qualities: [CourseClassVideoQuality!]!
  courseClass: CourseClass
  createdAt: String
  updatedAt: String
  deletedAt: String
  createdBy: User
  deletedBy: User
  updatedBy: User
}

type CourseClassVideoFormat {
  id: ID!
  name: String
  url: String
  hasTorrent: Boolean
  quality: CourseClassVideoQuality
  createdAt: String
  updatedAt: String
  deletedAt: String
  createdBy: User
  deletedBy: User
  updatedBy: User
}

type CourseClassVideoQuality {
  id: ID!
  height: Int
  width: Int
  video: CourseClassVideo
  formats: [CourseClassVideoFormat!]!
  createdAt: String
  updatedAt: String
  deletedAt: String
  createdBy: User
  deletedBy: User
  updatedBy: User
}

type Course {
  id: ID!
  code: String!
  name: String!
  iconUrl: String
  eva: String
  editions: [CourseEdition!]!
  createdAt: String
  updatedAt: String
  deletedAt: String
  createdBy: User
  updatedBy: User
  deletedBy: User
}

type CourseEdition {
  id: ID!
  name: String
  semester: Int
  year: Int
  courseClassLists: [CourseClassList!]!
  course: Course
  createdAt: String
  updatedAt: String
  deletedAt: String
  createdBy: User
  updatedBy: User
  deletedBy: User
}

type Faq {
  id: ID!
  title: String!
  content: String!
  isHtml: Boolean
  createdAt: String
  createdBy: User
  updatedAt: String
  updatedBy: User
  deletedAt: String
  deletedBy: User
}

type Query {
  _: Void
  courseByCode(code: String!): CourseByCodeResult!
  courseById(id: ID!): CourseByIdResult!
  courseClassById(id: ID!): CourseClassByIdResult!
  courseClassListByCode(code: String!): CourseClassListByCodeResult!
  courseClassListById(id: ID!): CourseClassListByIdResult!
  courseEditionById(id: ID!): CourseEditionByIdResult!
  courses: [Course!]!
  faqs: [Faq!]!
  latestCourseClasses: [CourseClass!]!
  userRoles: [UserRole!]!
}

type User {
  id: ID!
  email: String!
  name: String
  uid: String
  roles: [UserRole!]!
  createdAt: String
  updatedAt: String
  deletedAt: String
}

type UserRole {
  id: ID!
  code: String!
}

union CourseByCodeResult = Course | NotFoundError

union CourseByIdResult = Course | NotFoundError

union CourseClassByIdResult = CourseClass | NotFoundError

union CourseClassListByCodeResult = CourseClassList | NotFoundError

union CourseClassListByIdResult = CourseClassList | NotFoundError

union CourseEditionByIdResult = CourseEdition | NotFoundError

enum CreateCourseInputVisibility {
  PUBLIC
  HIDDEN
  DISABLED
}

input CreateCourseInput {
  code: String!
  name: String!
  eva: String
  visibility: CreateCourseInputVisibility
}

type CreateCoursePayload {
  course: Course!
}

union CreateCourseResult = CreateCoursePayload | GenericError | AuthenticationError

enum CacheControlScope {
  PUBLIC
  PRIVATE
}

"""The \`Upload\` scalar type represents a file upload."""
scalar Upload
`