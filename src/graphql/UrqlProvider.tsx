import { devtoolsExchange } from "@urql/devtools"
import type { AuthConfig } from "@urql/exchange-auth"
import { authExchange } from "@urql/exchange-auth"
import type { UpdateResolver } from "@urql/exchange-graphcache"
import { cacheExchange } from "@urql/exchange-graphcache"
import identity from "lodash/identity"
import { Context, createClient, fetchExchange } from "urql"

import { useAuthStore } from "../auth"
import { useRefWithInitializer } from "../hooks/useRefWithInitializer"
import { graphqlConfig } from "./graphql.config"
import introspection from "./introspection.json"
import type {
	CourseClass,
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

	const client = useRefWithInitializer(() => {
		const client = createClient({
			url: graphqlConfig.uri,
			exchanges: [
				devtoolsExchange,
				cacheExchange({
					schema: introspection as any,
					updates: updates,
					keys: {
						NotFoundError: () => null,
					},
				}),
				authExchange(
					async ({ mutate, appendHeaders }) =>
						({
							async refreshAuth() {
								const refreshToken = authStore.grant.getValue()?.refreshToken
								if (!refreshToken) {
									return
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
									const { grant } = response.data.refreshToken
									authStore.grant.next(grant)
								}
							},

							addAuthToOperation(operation) {
								const token = authStore.grant.getValue()?.token
								if (!token) {
									return operation
								}

								return appendHeaders(operation, {
									Authorization: `Bearer ${token}`,
								})
							},

							didAuthError() {
								// TODO: implement
								return false
							},
						}) satisfies AuthConfig
				),
				fetchExchange,
			],
		})

		return client
	}).current

	return <Context.Provider value={client}>{children}</Context.Provider>
}
