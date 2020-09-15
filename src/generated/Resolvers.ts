import { GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ResolveInfo as GraphQLResolveInfo } from './ResolversAux';
import { Context } from './ResolversAux';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Void: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};



export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Void']>;
  courses: Array<Course>;
  courseById: CourseByIdResult;
  courseByCode: CourseByCodeResult;
  courseClassById: CourseClassByIdResult;
  latestCourseClasses: Array<CourseClass>;
  courseClassListById: CourseClassListByIdResult;
  courseClassListByCode: CourseClassListByCodeResult;
  courseEditionById: CourseEditionByIdResult;
  faqs: Array<Faq>;
  userRoles: Array<UserRole>;
};


export type QueryCourseByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCourseByCodeArgs = {
  code: Scalars['String'];
};


export type QueryCourseClassByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCourseClassListByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCourseClassListByCodeArgs = {
  code: Scalars['String'];
};


export type QueryCourseEditionByIdArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Void']>;
  createCourse: CreateCoursePayload;
  updateCourseClassVideos: NotFoundError;
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type MutationUpdateCourseClassVideosArgs = {
  courseClassId: Scalars['ID'];
  secret: Scalars['String'];
};

export type GenericError = {
  __typename?: 'GenericError';
  _?: Maybe<Scalars['Void']>;
};

export type NotFoundError = {
  __typename?: 'NotFoundError';
  _?: Maybe<Scalars['Void']>;
};

export type AuthenticationError = {
  __typename?: 'AuthenticationError';
  _?: Maybe<Scalars['Void']>;
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
  iconUrl?: Maybe<Scalars['String']>;
  eva?: Maybe<Scalars['String']>;
  editions: Array<CourseEdition>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  updatedBy?: Maybe<User>;
  deletedBy?: Maybe<User>;
};

export type CourseByIdResult = Course | NotFoundError;

export type CourseByCodeResult = Course | NotFoundError;

export type CreateCourseInput = {
  code: Scalars['String'];
  name: Scalars['String'];
  eva?: Maybe<Scalars['String']>;
  editionName: Scalars['String'];
  editionSemester: Scalars['Int'];
  editionYear: Scalars['Int'];
  courseClassListCode: Scalars['String'];
  courseClassListName: Scalars['String'];
};

export type CreateCoursePayload = GenericError | NotFoundError;

export type CourseClass = {
  __typename?: 'CourseClass';
  id: Scalars['ID'];
  number?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  videos: Array<CourseClassVideo>;
  courseClassList?: Maybe<CourseClassList>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  updatedBy?: Maybe<User>;
  deletedBy?: Maybe<User>;
};

export type CourseClassByIdResult = CourseClass | NotFoundError;

export type UpdateCourseClassVideosResult = CourseClass | NotFoundError;

export type CourseClassList = {
  __typename?: 'CourseClassList';
  id: Scalars['ID'];
  code: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  classes?: Maybe<Array<CourseClass>>;
  courseEdition?: Maybe<CourseEdition>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  updatedBy?: Maybe<User>;
  deletedBy?: Maybe<User>;
};

export type CourseClassListByIdResult = CourseClassList | NotFoundError;

export type CourseClassListByCodeResult = CourseClassList | NotFoundError;

export type CourseClassVideo = {
  __typename?: 'CourseClassVideo';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  qualities: Array<CourseClassVideoQuality>;
  courseClass?: Maybe<CourseClass>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  deletedBy?: Maybe<User>;
  updatedBy?: Maybe<User>;
};

export type CourseClassVideoFormat = {
  __typename?: 'CourseClassVideoFormat';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  hasTorrent?: Maybe<Scalars['Boolean']>;
  quality?: Maybe<CourseClassVideoQuality>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  deletedBy?: Maybe<User>;
  updatedBy?: Maybe<User>;
};

export type CourseClassVideoQuality = {
  __typename?: 'CourseClassVideoQuality';
  id: Scalars['ID'];
  height?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
  video?: Maybe<CourseClassVideo>;
  formats: Array<CourseClassVideoFormat>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  deletedBy?: Maybe<User>;
  updatedBy?: Maybe<User>;
};

export type CourseEdition = {
  __typename?: 'CourseEdition';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  semester?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
  courseClassLists: Array<CourseClassList>;
  course?: Maybe<Course>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  updatedBy?: Maybe<User>;
  deletedBy?: Maybe<User>;
};

export type CourseEditionByIdResult = CourseEdition | NotFoundError;

export type Faq = {
  __typename?: 'Faq';
  id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  isHtml?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars['String']>;
  deletedBy?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  roles: Array<UserRole>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
};

export type UserRole = {
  __typename?: 'UserRole';
  id: Scalars['ID'];
  code: Scalars['String'];
};

export type CacheControlScope = 
  | 'PUBLIC'
  | 'PRIVATE';




export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Void: ResolverTypeWrapper<Scalars['Void']>;
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  GenericError: ResolverTypeWrapper<GenericError>;
  NotFoundError: ResolverTypeWrapper<NotFoundError>;
  AuthenticationError: ResolverTypeWrapper<AuthenticationError>;
  Course: ResolverTypeWrapper<Course>;
  CourseByIdResult: ResolversTypes['Course'] | ResolversTypes['NotFoundError'];
  CourseByCodeResult: ResolversTypes['Course'] | ResolversTypes['NotFoundError'];
  CreateCourseInput: CreateCourseInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CreateCoursePayload: ResolversTypes['GenericError'] | ResolversTypes['NotFoundError'];
  CourseClass: ResolverTypeWrapper<CourseClass>;
  CourseClassByIdResult: ResolversTypes['CourseClass'] | ResolversTypes['NotFoundError'];
  UpdateCourseClassVideosResult: ResolversTypes['CourseClass'] | ResolversTypes['NotFoundError'];
  CourseClassList: ResolverTypeWrapper<CourseClassList>;
  CourseClassListByIdResult: ResolversTypes['CourseClassList'] | ResolversTypes['NotFoundError'];
  CourseClassListByCodeResult: ResolversTypes['CourseClassList'] | ResolversTypes['NotFoundError'];
  CourseClassVideo: ResolverTypeWrapper<CourseClassVideo>;
  CourseClassVideoFormat: ResolverTypeWrapper<CourseClassVideoFormat>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CourseClassVideoQuality: ResolverTypeWrapper<CourseClassVideoQuality>;
  CourseEdition: ResolverTypeWrapper<CourseEdition>;
  CourseEditionByIdResult: ResolversTypes['CourseEdition'] | ResolversTypes['NotFoundError'];
  Faq: ResolverTypeWrapper<Faq>;
  User: ResolverTypeWrapper<User>;
  UserRole: ResolverTypeWrapper<UserRole>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Void: Scalars['Void'];
  Query: {};
  ID: Scalars['ID'];
  String: Scalars['String'];
  Mutation: {};
  GenericError: GenericError;
  NotFoundError: NotFoundError;
  AuthenticationError: AuthenticationError;
  Course: Course;
  CourseByIdResult: ResolversParentTypes['Course'] | ResolversParentTypes['NotFoundError'];
  CourseByCodeResult: ResolversParentTypes['Course'] | ResolversParentTypes['NotFoundError'];
  CreateCourseInput: CreateCourseInput;
  Int: Scalars['Int'];
  CreateCoursePayload: ResolversParentTypes['GenericError'] | ResolversParentTypes['NotFoundError'];
  CourseClass: CourseClass;
  CourseClassByIdResult: ResolversParentTypes['CourseClass'] | ResolversParentTypes['NotFoundError'];
  UpdateCourseClassVideosResult: ResolversParentTypes['CourseClass'] | ResolversParentTypes['NotFoundError'];
  CourseClassList: CourseClassList;
  CourseClassListByIdResult: ResolversParentTypes['CourseClassList'] | ResolversParentTypes['NotFoundError'];
  CourseClassListByCodeResult: ResolversParentTypes['CourseClassList'] | ResolversParentTypes['NotFoundError'];
  CourseClassVideo: CourseClassVideo;
  CourseClassVideoFormat: CourseClassVideoFormat;
  Boolean: Scalars['Boolean'];
  CourseClassVideoQuality: CourseClassVideoQuality;
  CourseEdition: CourseEdition;
  CourseEditionByIdResult: ResolversParentTypes['CourseEdition'] | ResolversParentTypes['NotFoundError'];
  Faq: Faq;
  User: User;
  UserRole: UserRole;
  Upload: Scalars['Upload'];
};

export type ClientDirectiveArgs = {  };

export type ClientDirectiveResolver<Result, Parent, ContextType = Context, Args = ClientDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType>;
  courses: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  courseById: Resolver<ResolversTypes['CourseByIdResult'], ParentType, ContextType, RequireFields<QueryCourseByIdArgs, 'id'>>;
  courseByCode: Resolver<ResolversTypes['CourseByCodeResult'], ParentType, ContextType, RequireFields<QueryCourseByCodeArgs, 'code'>>;
  courseClassById: Resolver<ResolversTypes['CourseClassByIdResult'], ParentType, ContextType, RequireFields<QueryCourseClassByIdArgs, 'id'>>;
  latestCourseClasses: Resolver<Array<ResolversTypes['CourseClass']>, ParentType, ContextType>;
  courseClassListById: Resolver<ResolversTypes['CourseClassListByIdResult'], ParentType, ContextType, RequireFields<QueryCourseClassListByIdArgs, 'id'>>;
  courseClassListByCode: Resolver<ResolversTypes['CourseClassListByCodeResult'], ParentType, ContextType, RequireFields<QueryCourseClassListByCodeArgs, 'code'>>;
  courseEditionById: Resolver<ResolversTypes['CourseEditionByIdResult'], ParentType, ContextType, RequireFields<QueryCourseEditionByIdArgs, 'id'>>;
  faqs: Resolver<Array<ResolversTypes['Faq']>, ParentType, ContextType>;
  userRoles: Resolver<Array<ResolversTypes['UserRole']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType>;
  createCourse: Resolver<ResolversTypes['CreateCoursePayload'], ParentType, ContextType, RequireFields<MutationCreateCourseArgs, 'input'>>;
  updateCourseClassVideos: Resolver<ResolversTypes['NotFoundError'], ParentType, ContextType, RequireFields<MutationUpdateCourseClassVideosArgs, 'courseClassId' | 'secret'>>;
};

export type GenericErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GenericError'] = ResolversParentTypes['GenericError']> = {
  _: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type NotFoundErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NotFoundError'] = ResolversParentTypes['NotFoundError']> = {
  _: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AuthenticationErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthenticationError'] = ResolversParentTypes['AuthenticationError']> = {
  _: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iconUrl: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  eva: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  editions: Resolver<Array<ResolversTypes['CourseEdition']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  updatedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  deletedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseByIdResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseByIdResult'] = ResolversParentTypes['CourseByIdResult']> = {
  __resolveType: TypeResolveFn<'Course' | 'NotFoundError', ParentType, ContextType>;
};

export type CourseByCodeResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseByCodeResult'] = ResolversParentTypes['CourseByCodeResult']> = {
  __resolveType: TypeResolveFn<'Course' | 'NotFoundError', ParentType, ContextType>;
};

export type CreateCoursePayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateCoursePayload'] = ResolversParentTypes['CreateCoursePayload']> = {
  __resolveType: TypeResolveFn<'GenericError' | 'NotFoundError', ParentType, ContextType>;
};

export type CourseClassResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseClass'] = ResolversParentTypes['CourseClass']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  number: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videos: Resolver<Array<ResolversTypes['CourseClassVideo']>, ParentType, ContextType>;
  courseClassList: Resolver<Maybe<ResolversTypes['CourseClassList']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  updatedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  deletedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseClassByIdResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseClassByIdResult'] = ResolversParentTypes['CourseClassByIdResult']> = {
  __resolveType: TypeResolveFn<'CourseClass' | 'NotFoundError', ParentType, ContextType>;
};

export type UpdateCourseClassVideosResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UpdateCourseClassVideosResult'] = ResolversParentTypes['UpdateCourseClassVideosResult']> = {
  __resolveType: TypeResolveFn<'CourseClass' | 'NotFoundError', ParentType, ContextType>;
};

export type CourseClassListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseClassList'] = ResolversParentTypes['CourseClassList']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classes: Resolver<Maybe<Array<ResolversTypes['CourseClass']>>, ParentType, ContextType>;
  courseEdition: Resolver<Maybe<ResolversTypes['CourseEdition']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  updatedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  deletedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseClassListByIdResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseClassListByIdResult'] = ResolversParentTypes['CourseClassListByIdResult']> = {
  __resolveType: TypeResolveFn<'CourseClassList' | 'NotFoundError', ParentType, ContextType>;
};

export type CourseClassListByCodeResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseClassListByCodeResult'] = ResolversParentTypes['CourseClassListByCodeResult']> = {
  __resolveType: TypeResolveFn<'CourseClassList' | 'NotFoundError', ParentType, ContextType>;
};

export type CourseClassVideoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseClassVideo'] = ResolversParentTypes['CourseClassVideo']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qualities: Resolver<Array<ResolversTypes['CourseClassVideoQuality']>, ParentType, ContextType>;
  courseClass: Resolver<Maybe<ResolversTypes['CourseClass']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  deletedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  updatedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseClassVideoFormatResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseClassVideoFormat'] = ResolversParentTypes['CourseClassVideoFormat']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasTorrent: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  quality: Resolver<Maybe<ResolversTypes['CourseClassVideoQuality']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  deletedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  updatedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseClassVideoQualityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseClassVideoQuality'] = ResolversParentTypes['CourseClassVideoQuality']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  height: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  width: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  video: Resolver<Maybe<ResolversTypes['CourseClassVideo']>, ParentType, ContextType>;
  formats: Resolver<Array<ResolversTypes['CourseClassVideoFormat']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  deletedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  updatedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseEditionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseEdition'] = ResolversParentTypes['CourseEdition']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  semester: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  courseClassLists: Resolver<Array<ResolversTypes['CourseClassList']>, ParentType, ContextType>;
  course: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  updatedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  deletedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CourseEditionByIdResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseEditionByIdResult'] = ResolversParentTypes['CourseEditionByIdResult']> = {
  __resolveType: TypeResolveFn<'CourseEdition' | 'NotFoundError', ParentType, ContextType>;
};

export type FaqResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Faq'] = ResolversParentTypes['Faq']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isHtml: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  deletedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedBy: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uid: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles: Resolver<Array<ResolversTypes['UserRole']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deletedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserRoleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = Context> = {
  Void: GraphQLScalarType;
  Query: QueryResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  GenericError: GenericErrorResolvers<ContextType>;
  NotFoundError: NotFoundErrorResolvers<ContextType>;
  AuthenticationError: AuthenticationErrorResolvers<ContextType>;
  Course: CourseResolvers<ContextType>;
  CourseByIdResult: CourseByIdResultResolvers<ContextType>;
  CourseByCodeResult: CourseByCodeResultResolvers<ContextType>;
  CreateCoursePayload: CreateCoursePayloadResolvers<ContextType>;
  CourseClass: CourseClassResolvers<ContextType>;
  CourseClassByIdResult: CourseClassByIdResultResolvers<ContextType>;
  UpdateCourseClassVideosResult: UpdateCourseClassVideosResultResolvers<ContextType>;
  CourseClassList: CourseClassListResolvers<ContextType>;
  CourseClassListByIdResult: CourseClassListByIdResultResolvers<ContextType>;
  CourseClassListByCodeResult: CourseClassListByCodeResultResolvers<ContextType>;
  CourseClassVideo: CourseClassVideoResolvers<ContextType>;
  CourseClassVideoFormat: CourseClassVideoFormatResolvers<ContextType>;
  CourseClassVideoQuality: CourseClassVideoQualityResolvers<ContextType>;
  CourseEdition: CourseEditionResolvers<ContextType>;
  CourseEditionByIdResult: CourseEditionByIdResultResolvers<ContextType>;
  Faq: FaqResolvers<ContextType>;
  User: UserResolvers<ContextType>;
  UserRole: UserRoleResolvers<ContextType>;
  Upload: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = Context> = {
  client: ClientDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = Context> = DirectiveResolvers<ContextType>;