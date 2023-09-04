/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A high precision floating point value represented as a string */
  BigFloat: { input: any; output: any; }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: any; output: any; }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any; }
  /** A date wihout time information */
  Date: { input: any; output: any; }
  /** A date and time */
  Datetime: { input: any; output: any; }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: any; output: any; }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any; }
  /** A time without date information */
  Time: { input: any; output: any; }
  /** A universally unique identifier */
  UUID: { input: any; output: any; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

export type Course = Node & {
  __typename?: 'Course';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  editions?: Maybe<CourseEditionConnection>;
  eva?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  visibility?: Maybe<Scalars['Opaque']['output']>;
};


export type CourseEditionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseEditionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseEditionOrderBy>>;
};

export type CourseClass = Node & {
  __typename?: 'CourseClass';
  courseClassList?: Maybe<CourseClassList>;
  courseClassListId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  cues?: Maybe<CourseClassChapterCueConnection>;
  id?: Maybe<Scalars['UUID']['output']>;
  liveState?: Maybe<Scalars['Opaque']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  number?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  videos?: Maybe<CourseClassVideoConnection>;
  visibility?: Maybe<Scalars['Opaque']['output']>;
};


export type CourseClassCuesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseClassChapterCueFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseClassChapterCueOrderBy>>;
};


export type CourseClassVideosArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseClassVideoFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseClassVideoOrderBy>>;
};

export type CourseClassChapterCue = Node & {
  __typename?: 'CourseClassChapterCue';
  courseClass?: Maybe<CourseClass>;
  courseClassId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  startSeconds?: Maybe<Scalars['BigFloat']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

export type CourseClassChapterCueConnection = {
  __typename?: 'CourseClassChapterCueConnection';
  edges: Array<CourseClassChapterCueEdge>;
  pageInfo: PageInfo;
};

export type CourseClassChapterCueDeleteResponse = {
  __typename?: 'CourseClassChapterCueDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassChapterCue>;
};

export type CourseClassChapterCueEdge = {
  __typename?: 'CourseClassChapterCueEdge';
  cursor: Scalars['String']['output'];
  node: CourseClassChapterCue;
};

export type CourseClassChapterCueFilter = {
  courseClassId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  startSeconds?: InputMaybe<BigFloatFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type CourseClassChapterCueInsertInput = {
  courseClassId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startSeconds?: InputMaybe<Scalars['BigFloat']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type CourseClassChapterCueInsertResponse = {
  __typename?: 'CourseClassChapterCueInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassChapterCue>;
};

export type CourseClassChapterCueOrderBy = {
  courseClassId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  startSeconds?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type CourseClassChapterCueUpdateInput = {
  courseClassId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startSeconds?: InputMaybe<Scalars['BigFloat']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type CourseClassChapterCueUpdateResponse = {
  __typename?: 'CourseClassChapterCueUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassChapterCue>;
};

export type CourseClassConnection = {
  __typename?: 'CourseClassConnection';
  edges: Array<CourseClassEdge>;
  pageInfo: PageInfo;
};

export type CourseClassDeleteResponse = {
  __typename?: 'CourseClassDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClass>;
};

export type CourseClassEdge = {
  __typename?: 'CourseClassEdge';
  cursor: Scalars['String']['output'];
  node: CourseClass;
};

export type CourseClassFilter = {
  courseClassListId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  number?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  visibility?: InputMaybe<OpaqueFilter>;
};

export type CourseClassInsertInput = {
  courseClassListId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  visibility?: InputMaybe<Scalars['Opaque']['input']>;
};

export type CourseClassInsertResponse = {
  __typename?: 'CourseClassInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClass>;
};

export type CourseClassList = Node & {
  __typename?: 'CourseClassList';
  code?: Maybe<Scalars['String']['output']>;
  courseClass?: Maybe<CourseClassConnection>;
  courseEditionId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  edition?: Maybe<CourseEdition>;
  id?: Maybe<Scalars['UUID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  visibility?: Maybe<Scalars['Opaque']['output']>;
};


export type CourseClassListCourseClassArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseClassFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseClassOrderBy>>;
};

export type CourseClassListConnection = {
  __typename?: 'CourseClassListConnection';
  edges: Array<CourseClassListEdge>;
  pageInfo: PageInfo;
};

export type CourseClassListDeleteResponse = {
  __typename?: 'CourseClassListDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassList>;
};

export type CourseClassListEdge = {
  __typename?: 'CourseClassListEdge';
  cursor: Scalars['String']['output'];
  node: CourseClassList;
};

export type CourseClassListFilter = {
  code?: InputMaybe<StringFilter>;
  courseEditionId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  visibility?: InputMaybe<OpaqueFilter>;
};

export type CourseClassListInsertInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  courseEditionId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  visibility?: InputMaybe<Scalars['Opaque']['input']>;
};

export type CourseClassListInsertResponse = {
  __typename?: 'CourseClassListInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassList>;
};

export type CourseClassListOrderBy = {
  code?: InputMaybe<OrderByDirection>;
  courseEditionId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  visibility?: InputMaybe<OrderByDirection>;
};

export type CourseClassListUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  courseEditionId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  visibility?: InputMaybe<Scalars['Opaque']['input']>;
};

export type CourseClassListUpdateResponse = {
  __typename?: 'CourseClassListUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassList>;
};

export type CourseClassLiveState = Node & {
  __typename?: 'CourseClassLiveState';
  courseClass?: Maybe<CourseClass>;
  courseClassId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  html?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  inProgress?: Maybe<Scalars['Boolean']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  startDate?: Maybe<Scalars['Datetime']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

export type CourseClassLiveStateConnection = {
  __typename?: 'CourseClassLiveStateConnection';
  edges: Array<CourseClassLiveStateEdge>;
  pageInfo: PageInfo;
};

export type CourseClassLiveStateDeleteResponse = {
  __typename?: 'CourseClassLiveStateDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassLiveState>;
};

export type CourseClassLiveStateEdge = {
  __typename?: 'CourseClassLiveStateEdge';
  cursor: Scalars['String']['output'];
  node: CourseClassLiveState;
};

export type CourseClassLiveStateFilter = {
  courseClassId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  html?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  inProgress?: InputMaybe<BooleanFilter>;
  nodeId?: InputMaybe<IdFilter>;
  startDate?: InputMaybe<DatetimeFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type CourseClassLiveStateInsertInput = {
  courseClassId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  inProgress?: InputMaybe<Scalars['Boolean']['input']>;
  startDate?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type CourseClassLiveStateInsertResponse = {
  __typename?: 'CourseClassLiveStateInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassLiveState>;
};

export type CourseClassLiveStateOrderBy = {
  courseClassId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  html?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  inProgress?: InputMaybe<OrderByDirection>;
  startDate?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type CourseClassLiveStateUpdateInput = {
  courseClassId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  inProgress?: InputMaybe<Scalars['Boolean']['input']>;
  startDate?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type CourseClassLiveStateUpdateResponse = {
  __typename?: 'CourseClassLiveStateUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassLiveState>;
};

export type CourseClassOrderBy = {
  courseClassListId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  number?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  visibility?: InputMaybe<OrderByDirection>;
};

export type CourseClassUpdateInput = {
  courseClassListId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  visibility?: InputMaybe<Scalars['Opaque']['input']>;
};

export type CourseClassUpdateResponse = {
  __typename?: 'CourseClassUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClass>;
};

export type CourseClassVideo = Node & {
  __typename?: 'CourseClassVideo';
  courseClass?: Maybe<CourseClass>;
  courseClassId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  position?: Maybe<Scalars['Int']['output']>;
  qualities?: Maybe<CourseClassVideoQualityConnection>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type CourseClassVideoQualitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseClassVideoQualityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseClassVideoQualityOrderBy>>;
};

export type CourseClassVideoConnection = {
  __typename?: 'CourseClassVideoConnection';
  edges: Array<CourseClassVideoEdge>;
  pageInfo: PageInfo;
};

export type CourseClassVideoDeleteResponse = {
  __typename?: 'CourseClassVideoDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassVideo>;
};

export type CourseClassVideoEdge = {
  __typename?: 'CourseClassVideoEdge';
  cursor: Scalars['String']['output'];
  node: CourseClassVideo;
};

export type CourseClassVideoFilter = {
  courseClassId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  position?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type CourseClassVideoFormat = Node & {
  __typename?: 'CourseClassVideoFormat';
  courseClassVideoQualityId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  quality?: Maybe<CourseClassVideoQuality>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type CourseClassVideoFormatConnection = {
  __typename?: 'CourseClassVideoFormatConnection';
  edges: Array<CourseClassVideoFormatEdge>;
  pageInfo: PageInfo;
};

export type CourseClassVideoFormatDeleteResponse = {
  __typename?: 'CourseClassVideoFormatDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassVideoFormat>;
};

export type CourseClassVideoFormatEdge = {
  __typename?: 'CourseClassVideoFormatEdge';
  cursor: Scalars['String']['output'];
  node: CourseClassVideoFormat;
};

export type CourseClassVideoFormatFilter = {
  courseClassVideoQualityId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type CourseClassVideoFormatInsertInput = {
  courseClassVideoQualityId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CourseClassVideoFormatInsertResponse = {
  __typename?: 'CourseClassVideoFormatInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassVideoFormat>;
};

export type CourseClassVideoFormatOrderBy = {
  courseClassVideoQualityId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  url?: InputMaybe<OrderByDirection>;
};

export type CourseClassVideoFormatUpdateInput = {
  courseClassVideoQualityId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CourseClassVideoFormatUpdateResponse = {
  __typename?: 'CourseClassVideoFormatUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassVideoFormat>;
};

export type CourseClassVideoInsertInput = {
  courseClassId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type CourseClassVideoInsertResponse = {
  __typename?: 'CourseClassVideoInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassVideo>;
};

export type CourseClassVideoOrderBy = {
  courseClassId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  position?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type CourseClassVideoQuality = Node & {
  __typename?: 'CourseClassVideoQuality';
  courseClassVideoId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  formats?: Maybe<CourseClassVideoFormatConnection>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  video?: Maybe<CourseClassVideo>;
  width?: Maybe<Scalars['Int']['output']>;
};


export type CourseClassVideoQualityFormatsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseClassVideoFormatFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseClassVideoFormatOrderBy>>;
};

export type CourseClassVideoQualityConnection = {
  __typename?: 'CourseClassVideoQualityConnection';
  edges: Array<CourseClassVideoQualityEdge>;
  pageInfo: PageInfo;
};

export type CourseClassVideoQualityDeleteResponse = {
  __typename?: 'CourseClassVideoQualityDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassVideoQuality>;
};

export type CourseClassVideoQualityEdge = {
  __typename?: 'CourseClassVideoQualityEdge';
  cursor: Scalars['String']['output'];
  node: CourseClassVideoQuality;
};

export type CourseClassVideoQualityFilter = {
  courseClassVideoId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  height?: InputMaybe<IntFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  width?: InputMaybe<IntFilter>;
};

export type CourseClassVideoQualityInsertInput = {
  courseClassVideoId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type CourseClassVideoQualityInsertResponse = {
  __typename?: 'CourseClassVideoQualityInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassVideoQuality>;
};

export type CourseClassVideoQualityOrderBy = {
  courseClassVideoId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  height?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  width?: InputMaybe<OrderByDirection>;
};

export type CourseClassVideoQualityUpdateInput = {
  courseClassVideoId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type CourseClassVideoQualityUpdateResponse = {
  __typename?: 'CourseClassVideoQualityUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassVideoQuality>;
};

export type CourseClassVideoUpdateInput = {
  courseClassId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type CourseClassVideoUpdateResponse = {
  __typename?: 'CourseClassVideoUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseClassVideo>;
};

export type CourseConnection = {
  __typename?: 'CourseConnection';
  edges: Array<CourseEdge>;
  pageInfo: PageInfo;
};

export type CourseDeleteResponse = {
  __typename?: 'CourseDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Course>;
};

export type CourseEdge = {
  __typename?: 'CourseEdge';
  cursor: Scalars['String']['output'];
  node: Course;
};

export type CourseEdition = Node & {
  __typename?: 'CourseEdition';
  course?: Maybe<Course>;
  courseClassLists?: Maybe<CourseClassListConnection>;
  courseId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  semester?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  visibility?: Maybe<Scalars['Opaque']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};


export type CourseEditionCourseClassListsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseClassListFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseClassListOrderBy>>;
};

export type CourseEditionConnection = {
  __typename?: 'CourseEditionConnection';
  edges: Array<CourseEditionEdge>;
  pageInfo: PageInfo;
};

export type CourseEditionDeleteResponse = {
  __typename?: 'CourseEditionDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseEdition>;
};

export type CourseEditionEdge = {
  __typename?: 'CourseEditionEdge';
  cursor: Scalars['String']['output'];
  node: CourseEdition;
};

export type CourseEditionFilter = {
  courseId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  semester?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  visibility?: InputMaybe<OpaqueFilter>;
  year?: InputMaybe<IntFilter>;
};

export type CourseEditionInsertInput = {
  courseId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  semester?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  visibility?: InputMaybe<Scalars['Opaque']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type CourseEditionInsertResponse = {
  __typename?: 'CourseEditionInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseEdition>;
};

export type CourseEditionOrderBy = {
  courseId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  semester?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  visibility?: InputMaybe<OrderByDirection>;
  year?: InputMaybe<OrderByDirection>;
};

export type CourseEditionUpdateInput = {
  courseId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  semester?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  visibility?: InputMaybe<Scalars['Opaque']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type CourseEditionUpdateResponse = {
  __typename?: 'CourseEditionUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CourseEdition>;
};

export type CourseFilter = {
  code?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  eva?: InputMaybe<StringFilter>;
  iconUrl?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  visibility?: InputMaybe<OpaqueFilter>;
};

export type CourseInsertInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  eva?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  visibility?: InputMaybe<Scalars['Opaque']['input']>;
};

export type CourseInsertResponse = {
  __typename?: 'CourseInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Course>;
};

export type CourseOrderBy = {
  code?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  eva?: InputMaybe<OrderByDirection>;
  iconUrl?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  visibility?: InputMaybe<OrderByDirection>;
};

export type CourseUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  eva?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  visibility?: InputMaybe<Scalars['Opaque']['input']>;
};

export type CourseUpdateResponse = {
  __typename?: 'CourseUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Course>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Faq = Node & {
  __typename?: 'Faq';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  isHtml?: Maybe<Scalars['Boolean']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  position?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

export type FaqConnection = {
  __typename?: 'FaqConnection';
  edges: Array<FaqEdge>;
  pageInfo: PageInfo;
};

export type FaqDeleteResponse = {
  __typename?: 'FaqDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Faq>;
};

export type FaqEdge = {
  __typename?: 'FaqEdge';
  cursor: Scalars['String']['output'];
  node: Faq;
};

export type FaqFilter = {
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  isHtml?: InputMaybe<BooleanFilter>;
  nodeId?: InputMaybe<IdFilter>;
  position?: InputMaybe<IntFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type FaqInsertInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isHtml?: InputMaybe<Scalars['Boolean']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type FaqInsertResponse = {
  __typename?: 'FaqInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Faq>;
};

export type FaqOrderBy = {
  content?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  isHtml?: InputMaybe<OrderByDirection>;
  position?: InputMaybe<OrderByDirection>;
  title?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type FaqUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isHtml?: InputMaybe<Scalars['Boolean']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type FaqUpdateResponse = {
  __typename?: 'FaqUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Faq>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `CourseClassChapterCue` collection */
  deleteFromCourseClassChapterCueCollection: CourseClassChapterCueDeleteResponse;
  /** Deletes zero or more records from the `CourseClass` collection */
  deleteFromCourseClassCollection: CourseClassDeleteResponse;
  /** Deletes zero or more records from the `CourseClassList` collection */
  deleteFromCourseClassListCollection: CourseClassListDeleteResponse;
  /** Deletes zero or more records from the `CourseClassLiveState` collection */
  deleteFromCourseClassLiveStateCollection: CourseClassLiveStateDeleteResponse;
  /** Deletes zero or more records from the `CourseClassVideo` collection */
  deleteFromCourseClassVideoCollection: CourseClassVideoDeleteResponse;
  /** Deletes zero or more records from the `CourseClassVideoFormat` collection */
  deleteFromCourseClassVideoFormatCollection: CourseClassVideoFormatDeleteResponse;
  /** Deletes zero or more records from the `CourseClassVideoQuality` collection */
  deleteFromCourseClassVideoQualityCollection: CourseClassVideoQualityDeleteResponse;
  /** Deletes zero or more records from the `Course` collection */
  deleteFromCourseCollection: CourseDeleteResponse;
  /** Deletes zero or more records from the `CourseEdition` collection */
  deleteFromCourseEditionCollection: CourseEditionDeleteResponse;
  /** Deletes zero or more records from the `Faq` collection */
  deleteFromFaqCollection: FaqDeleteResponse;
  /** Adds one or more `CourseClassChapterCue` records to the collection */
  insertIntoCourseClassChapterCueCollection?: Maybe<CourseClassChapterCueInsertResponse>;
  /** Adds one or more `CourseClass` records to the collection */
  insertIntoCourseClassCollection?: Maybe<CourseClassInsertResponse>;
  /** Adds one or more `CourseClassList` records to the collection */
  insertIntoCourseClassListCollection?: Maybe<CourseClassListInsertResponse>;
  /** Adds one or more `CourseClassLiveState` records to the collection */
  insertIntoCourseClassLiveStateCollection?: Maybe<CourseClassLiveStateInsertResponse>;
  /** Adds one or more `CourseClassVideo` records to the collection */
  insertIntoCourseClassVideoCollection?: Maybe<CourseClassVideoInsertResponse>;
  /** Adds one or more `CourseClassVideoFormat` records to the collection */
  insertIntoCourseClassVideoFormatCollection?: Maybe<CourseClassVideoFormatInsertResponse>;
  /** Adds one or more `CourseClassVideoQuality` records to the collection */
  insertIntoCourseClassVideoQualityCollection?: Maybe<CourseClassVideoQualityInsertResponse>;
  /** Adds one or more `Course` records to the collection */
  insertIntoCourseCollection?: Maybe<CourseInsertResponse>;
  /** Adds one or more `CourseEdition` records to the collection */
  insertIntoCourseEditionCollection?: Maybe<CourseEditionInsertResponse>;
  /** Adds one or more `Faq` records to the collection */
  insertIntoFaqCollection?: Maybe<FaqInsertResponse>;
  /** Updates zero or more records in the `CourseClassChapterCue` collection */
  updateCourseClassChapterCueCollection: CourseClassChapterCueUpdateResponse;
  /** Updates zero or more records in the `CourseClass` collection */
  updateCourseClassCollection: CourseClassUpdateResponse;
  /** Updates zero or more records in the `CourseClassList` collection */
  updateCourseClassListCollection: CourseClassListUpdateResponse;
  /** Updates zero or more records in the `CourseClassLiveState` collection */
  updateCourseClassLiveStateCollection: CourseClassLiveStateUpdateResponse;
  /** Updates zero or more records in the `CourseClassVideo` collection */
  updateCourseClassVideoCollection: CourseClassVideoUpdateResponse;
  /** Updates zero or more records in the `CourseClassVideoFormat` collection */
  updateCourseClassVideoFormatCollection: CourseClassVideoFormatUpdateResponse;
  /** Updates zero or more records in the `CourseClassVideoQuality` collection */
  updateCourseClassVideoQualityCollection: CourseClassVideoQualityUpdateResponse;
  /** Updates zero or more records in the `Course` collection */
  updateCourseCollection: CourseUpdateResponse;
  /** Updates zero or more records in the `CourseEdition` collection */
  updateCourseEditionCollection: CourseEditionUpdateResponse;
  /** Updates zero or more records in the `Faq` collection */
  updateFaqCollection: FaqUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCourseClassChapterCueCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassChapterCueFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCourseClassCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCourseClassListCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassListFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCourseClassLiveStateCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassLiveStateFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCourseClassVideoCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassVideoFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCourseClassVideoFormatCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassVideoFormatFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCourseClassVideoQualityCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassVideoQualityFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCourseCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCourseEditionCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseEditionFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromFaqCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FaqFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCourseClassChapterCueCollectionArgs = {
  objects: Array<CourseClassChapterCueInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCourseClassCollectionArgs = {
  objects: Array<CourseClassInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCourseClassListCollectionArgs = {
  objects: Array<CourseClassListInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCourseClassLiveStateCollectionArgs = {
  objects: Array<CourseClassLiveStateInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCourseClassVideoCollectionArgs = {
  objects: Array<CourseClassVideoInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCourseClassVideoFormatCollectionArgs = {
  objects: Array<CourseClassVideoFormatInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCourseClassVideoQualityCollectionArgs = {
  objects: Array<CourseClassVideoQualityInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCourseCollectionArgs = {
  objects: Array<CourseInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCourseEditionCollectionArgs = {
  objects: Array<CourseEditionInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoFaqCollectionArgs = {
  objects: Array<FaqInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdateCourseClassChapterCueCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassChapterCueFilter>;
  set: CourseClassChapterCueUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateCourseClassCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassFilter>;
  set: CourseClassUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateCourseClassListCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassListFilter>;
  set: CourseClassListUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateCourseClassLiveStateCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassLiveStateFilter>;
  set: CourseClassLiveStateUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateCourseClassVideoCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassVideoFilter>;
  set: CourseClassVideoUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateCourseClassVideoFormatCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassVideoFormatFilter>;
  set: CourseClassVideoFormatUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateCourseClassVideoQualityCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseClassVideoQualityFilter>;
  set: CourseClassVideoQualityUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateCourseCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseFilter>;
  set: CourseUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateCourseEditionCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CourseEditionFilter>;
  set: CourseEditionUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateFaqCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FaqFilter>;
  set: FaqUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `CourseClassChapterCue` */
  courseClassChapterCueCollection?: Maybe<CourseClassChapterCueConnection>;
  /** A pagable collection of type `CourseClass` */
  courseClassCollection?: Maybe<CourseClassConnection>;
  /** A pagable collection of type `CourseClassList` */
  courseClassListCollection?: Maybe<CourseClassListConnection>;
  /** A pagable collection of type `CourseClassLiveState` */
  courseClassLiveStateCollection?: Maybe<CourseClassLiveStateConnection>;
  /** A pagable collection of type `CourseClassVideo` */
  courseClassVideoCollection?: Maybe<CourseClassVideoConnection>;
  /** A pagable collection of type `CourseClassVideoFormat` */
  courseClassVideoFormatCollection?: Maybe<CourseClassVideoFormatConnection>;
  /** A pagable collection of type `CourseClassVideoQuality` */
  courseClassVideoQualityCollection?: Maybe<CourseClassVideoQualityConnection>;
  /** A pagable collection of type `Course` */
  courseCollection?: Maybe<CourseConnection>;
  /** A pagable collection of type `CourseEdition` */
  courseEditionCollection?: Maybe<CourseEditionConnection>;
  /** A pagable collection of type `Faq` */
  faqCollection?: Maybe<FaqConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
};


/** The root type for querying data */
export type QueryCourseClassChapterCueCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseClassChapterCueFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseClassChapterCueOrderBy>>;
};


/** The root type for querying data */
export type QueryCourseClassCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseClassFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseClassOrderBy>>;
};


/** The root type for querying data */
export type QueryCourseClassListCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseClassListFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseClassListOrderBy>>;
};


/** The root type for querying data */
export type QueryCourseClassLiveStateCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseClassLiveStateFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseClassLiveStateOrderBy>>;
};


/** The root type for querying data */
export type QueryCourseClassVideoCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseClassVideoFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseClassVideoOrderBy>>;
};


/** The root type for querying data */
export type QueryCourseClassVideoFormatCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseClassVideoFormatFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseClassVideoFormatOrderBy>>;
};


/** The root type for querying data */
export type QueryCourseClassVideoQualityCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseClassVideoQualityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseClassVideoQualityOrderBy>>;
};


/** The root type for querying data */
export type QueryCourseCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseOrderBy>>;
};


/** The root type for querying data */
export type QueryCourseEditionCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CourseEditionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CourseEditionOrderBy>>;
};


/** The root type for querying data */
export type QueryFaqCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<FaqFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FaqOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

export type CourseSearchCourseFragment = { __typename?: 'Course', id?: any | null, name?: string | null, code?: string | null };

export type CourseItemCourseFragment = { __typename?: 'Course', id?: any | null, code?: string | null, name?: string | null, eva?: string | null, iconUrl?: string | null, editions?: { __typename?: 'CourseEditionConnection', edges: Array<{ __typename?: 'CourseEditionEdge', node: { __typename?: 'CourseEdition', id?: any | null, year?: number | null, courseClassLists?: { __typename?: 'CourseClassListConnection', edges: Array<{ __typename?: 'CourseClassListEdge', node: { __typename?: 'CourseClassList', id?: any | null, code?: string | null } }> } | null } }> } | null };

export type CoursesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CoursesQueryQuery = { __typename?: 'Query', courseCollection?: { __typename?: 'CourseConnection', edges: Array<{ __typename?: 'CourseEdge', node: { __typename?: 'Course', id?: any | null, code?: string | null, name?: string | null, eva?: string | null, iconUrl?: string | null, editions?: { __typename?: 'CourseEditionConnection', edges: Array<{ __typename?: 'CourseEditionEdge', node: { __typename?: 'CourseEdition', id?: any | null, year?: number | null, courseClassLists?: { __typename?: 'CourseClassListConnection', edges: Array<{ __typename?: 'CourseClassListEdge', node: { __typename?: 'CourseClassList', id?: any | null, code?: string | null } }> } | null } }> } | null } }> } | null };

export type FaqItemFaqFragment = { __typename?: 'Faq', id?: any | null, title?: string | null, content?: string | null, isHtml?: boolean | null };

export type FaqQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type FaqQueryQuery = { __typename?: 'Query', faqCollection?: { __typename?: 'FaqConnection', edges: Array<{ __typename?: 'FaqEdge', node: { __typename?: 'Faq', id?: any | null, title?: string | null, content?: string | null, isHtml?: boolean | null } }> } | null };

export const CourseSearchCourseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseSearchCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]} as unknown as DocumentNode<CourseSearchCourseFragment, unknown>;
export const CourseItemCourseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseItemCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"eva"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"editions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"courseClassLists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CourseItemCourseFragment, unknown>;
export const FaqItemFaqFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FaqItemFaq"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Faq"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"isHtml"}}]}}]} as unknown as DocumentNode<FaqItemFaqFragment, unknown>;
export const CoursesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CoursesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courseCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseItemCourse"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CourseSearchCourse"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseItemCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"eva"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"editions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"courseClassLists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CourseSearchCourse"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]} as unknown as DocumentNode<CoursesQueryQuery, CoursesQueryQueryVariables>;
export const FaqQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FaqQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"faqCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FaqItemFaq"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FaqItemFaq"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Faq"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"isHtml"}}]}}]} as unknown as DocumentNode<FaqQueryQuery, FaqQueryQueryVariables>;