import gql from "graphql-tag";

export const remoteSchema = gql`scalar Void

type Query {
  _: Void
  courses: [Course!]!
  courseById(id: ID!): CourseByIdResult!
  courseByCode(code: String!): CourseByCodeResult!
  courseClassById(id: ID!): CourseClassByIdResult!
  latestCourseClasses: [CourseClass!]!
  courseClassListById(id: ID!): CourseClassListByIdResult!
  courseClassListByCode(code: String!): CourseClassListByCodeResult!
  courseEditionById(id: ID!): CourseEditionByIdResult!
  faqs: [Faq!]!
  userRoles: [UserRole!]!
}

type Mutation {
  _: Void
  createCourse(input: CreateCourseInput!): CreateCoursePayload!
  updateCourseClassVideos(courseClassId: ID!, secret: String!): NotFoundError!
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

union CourseByIdResult = Course | NotFoundError

union CourseByCodeResult = Course | NotFoundError

input CreateCourseInput {
  code: String!
  name: String!
  eva: String
  editionName: String!
  editionSemester: Int!
  editionYear: Int!
  courseClassListCode: String!
  courseClassListName: String!
}

union CreateCoursePayload = GenericError | NotFoundError

type CourseClass {
  id: ID!
  number: Int
  name: String
  videos: [CourseClassVideo!]!
  courseClassList: CourseClassList
  createdAt: String
  updatedAt: String
  deletedAt: String
  createdBy: User
  updatedBy: User
  deletedBy: User
}

union CourseClassByIdResult = CourseClass | NotFoundError

union UpdateCourseClassVideosResult = CourseClass | NotFoundError

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

union CourseClassListByIdResult = CourseClassList | NotFoundError

union CourseClassListByCodeResult = CourseClassList | NotFoundError

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

union CourseEditionByIdResult = CourseEdition | NotFoundError

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

enum CacheControlScope {
  PUBLIC
  PRIVATE
}

"""The \`Upload\` scalar type represents a file upload."""
scalar Upload
`