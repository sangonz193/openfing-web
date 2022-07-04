import { hasProperty } from "@sangonz193/utils/hasProperty"
import type { SafeOmit } from "@sangonz193/utils/SafeOmit"
import { devtoolsExchange } from "@urql/devtools"
import { authExchange } from "@urql/exchange-auth"
import type { Cache, DataField, Entity, FieldArgs, ResolveInfo, UpdateResolver } from "@urql/exchange-graphcache"
import { cacheExchange } from "@urql/exchange-graphcache"
import identity from "lodash/identity"
import { Context, createClient, dedupExchange, fetchExchange } from "urql"

import { useRefWithInitializer } from "../hooks/useRefWithInitializer"
import { useAuthStore } from "../modules/Auth"
import type { CourseClassListByCodeQueryVariables } from "../routes/courses/course/components/Course/Course.urqlGraphql.generated"
import { graphqlConfig } from "./graphql.config"
import introspection from "./introspection.json"
import type {
	CourseClass,
	CourseClassList,
	Grant,
	Mutation,
	MutationCreateCourse_V2Args,
	MutationCreateCourseClass_V2Args,
	MutationCreateCourseClassArgs,
	MutationCreateCourseClassChapterCueArgs,
	MutationCreateCourseClassList_V2Args,
	MutationCreatePostArgs,
	MutationDeletePostArgs,
	MutationSetCourseClassLiveState_V2Args,
	MutationUpdatePostArgs,
	QueryCourseByCodeArgs,
	QueryCourseByIdArgs,
	QueryCourseClassByIdArgs,
	QueryCourseClassListByCodeArgs,
	QueryCourseClassListByIdArgs,
} from "./remoteSchema.types"
import { RefreshTokenDocument } from "./UrqlProvider.urqlGraphql"
import type { RefreshTokenMutation, RefreshTokenMutationVariables } from "./UrqlProvider.urqlGraphql.generated"

export const UrqlProvider: React.FC = ({ children }) => {
	const authStore = useAuthStore()

	const updates: {
		Mutation: {
			[K in keyof Pick<Mutation, "createCourseClassChapterCue">]: UpdateResolver<
				{},
				MutationCreateCourseClassChapterCueArgs
			>
		} & {
			setCourseClassLiveState_v2: UpdateResolver<{}, MutationSetCourseClassLiveState_V2Args>
			createCourse_v2: UpdateResolver<{}, MutationCreateCourse_V2Args>
			createCourseClassList_v2: UpdateResolver<{}, MutationCreateCourseClassList_V2Args>
			createPost: UpdateResolver<{}, MutationCreatePostArgs>
			updatePost: UpdateResolver<{}, MutationUpdatePostArgs>
			deletePost: UpdateResolver<{}, MutationDeletePostArgs>
			createCourseClass: UpdateResolver<{}, MutationCreateCourseClassArgs>
			createCourseClass_v2: UpdateResolver<{}, MutationCreateCourseClass_V2Args>
		}
	} = {
		Mutation: {
			createCourseClassChapterCue: (_, args, cache) => {
				if (args.input.courseClassRef.byId?.id) {
					const courseClassId = args.input.courseClassRef.byId?.id
					cache.invalidate(
						{ __typename: "CourseClass", id: courseClassId },
						identity<keyof CourseClass>("chapterCues")
					)
				}
			},

			setCourseClassLiveState_v2: (_, args, cache) => {
				if (args.input.courseClassRef.byId) {
					cache.invalidate({
						__typename: "CourseClass",
						id: args.input.courseClassRef.byId.id,
					})
				}
			},

			createCourse_v2: (_, __, cache) => {
				cache.invalidate("Query", "courses")
			},

			createCourseClassList_v2: (_, __, cache) => {
				cache.invalidate("Query", "courses")
			},

			createPost: (_, __, cache) => {
				cache.invalidate("Query", "posts")
			},

			updatePost: (_, __, cache) => {
				cache.invalidate("Query", "posts")
			},

			deletePost: (_, __, cache) => {
				cache.invalidate("Query", "posts")
			},

			createCourseClass: (_, args, cache) => {
				if (args.input.courseClassListRef.byId) {
					cache.invalidate({
						__typename: "CourseClassList",
						id: args.input.courseClassListRef.byId.id,
					})
				}
			},

			createCourseClass_v2: (_, args, cache) => {
				if (args.input.courseClassListRef.byId) {
					cache.invalidate({
						__typename: "CourseClassList",
						id: args.input.courseClassListRef.byId.id,
					})
				}
			},
		},
	}

	const resolveAgainstCache = ({ args, cache, info }: { cache: Cache; info: ResolveInfo; args: FieldArgs }) =>
		cache.resolve(info.parentKey, info.fieldName, args)

	const client = useRefWithInitializer(() => {
		const client = createClient({
			url: graphqlConfig.uri,
			exchanges: [
				devtoolsExchange,
				dedupExchange,
				cacheExchange({
					schema: introspection as any,
					updates: updates,
					keys: {
						NotFoundError: () => null,
					},
					resolvers: {
						Query: {
							courseById: (_, args: QueryCourseByIdArgs) => ({ __typename: "Course", id: args.id }),

							courseByCode: (
								_,
								args: QueryCourseByCodeArgs,
								cache,
								info
							): Entity | DataField | undefined => {
								for (const value of (
									(cache as any).data.records.base as Map<string, unknown>
								).values()) {
									if (typeof value !== "object" || !value) {
										continue
									}

									if (
										!hasProperty(value, "__typename") ||
										value.__typename !== "Course" ||
										!hasProperty(value, "id") ||
										typeof value.id !== "string" ||
										!hasProperty(value, "code") ||
										typeof value.code !== "string" ||
										value.code !== args.code
									) {
										continue
									}

									return {
										__typename: "Course",
										id: value.id,
									}
								}

								return resolveAgainstCache({
									args,
									cache,
									info,
								})
							},

							courseClassById: (_, args: QueryCourseClassByIdArgs) => ({
								__typename: "CourseClass",
								id: args.id,
							}),

							courseClassListById: (_, args: QueryCourseClassListByIdArgs) => ({
								__typename: "CourseClassList",
								id: args.id,
							}),

							courseClassListByCode: (
								_,
								args: QueryCourseClassListByCodeArgs,
								cache,
								info
							): Entity | DataField | undefined => {
								for (const value of (
									(cache as any).data.records.base as Map<string, unknown>
								).values()) {
									if (typeof value !== "object" || !value) {
										continue
									}

									if (
										!hasProperty(value, "__typename") ||
										value.__typename !== "CourseClassList" ||
										!hasProperty(value, "id") ||
										typeof value.id !== "string" ||
										!hasProperty(value, "code") ||
										typeof value.code !== "string" ||
										value.code !== args.code
									) {
										continue
									}

									return {
										__typename: "CourseClassList",
										id: value.id,
									}
								}

								return resolveAgainstCache({
									args,
									cache,
									info,
								})
							},
						},

						CourseClassList: {
							code: (parent: Partial<CourseClassList>, _, cache) => {
								if (parent.code && parent.id) {
									const { id, code } = parent
									const courseClassListByCodeVariables: CourseClassListByCodeQueryVariables = {
										code: code,
									}

									const courseClassListByCode = cache.resolve(
										"Query",
										"courseClassListByCode",
										courseClassListByCodeVariables
									)

									if (!courseClassListByCode) {
										cache.link("Query", "courseClassListByCode", courseClassListByCodeVariables, {
											...parent,
											id: id,
											__typename: "CourseClassList",
										})
									}
								}

								return parent.code
							},
						},
					},
				}),
				authExchange<SafeOmit<Grant, "__typename">>({
					getAuth: async ({ authState, mutate }) => {
						const refreshToken = authState?.refreshToken || authStore.grant.getValue()?.refreshToken
						if (!refreshToken) {
							return null
						}

						const response = await mutate<RefreshTokenMutation, RefreshTokenMutationVariables>(
							RefreshTokenDocument,
							{
								input: {
									refreshToken: refreshToken,
								},
							}
						).catch(() => null)

						if (response?.data?.refreshToken.__typename === "RefreshTokenPayload") {
							return response.data.refreshToken.grant
						}

						return null
					},
					addAuthToOperation: ({ authState, operation }) => {
						const token = authState?.token || authStore.grant.getValue()?.token
						if (!token) {
							return operation
						}

						const fetchOptions =
							typeof operation.context.fetchOptions === "function"
								? operation.context.fetchOptions()
								: operation.context.fetchOptions || {}

						return {
							...operation,
							context: {
								...operation.context,
								fetchOptions: {
									...fetchOptions,
									headers: {
										...fetchOptions.headers,
										Authorization: `Bearer ${token}`,
									},
								},
							},
						}
					},
				}),
				fetchExchange,
			],
		})

		return client
	}).current

	return <Context.Provider value={client}>{children}</Context.Provider>
}
