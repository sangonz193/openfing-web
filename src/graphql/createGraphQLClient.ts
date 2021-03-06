import type { Resolvers, TypePolicy } from "@apollo/client"
import { ApolloClient, ApolloLink } from "@apollo/client"
import { InMemoryCache } from "@apollo/client/cache"
import { BatchHttpLink } from "@apollo/client/link/batch-http"
import { setContext } from "@apollo/client/link/context"
import { hasProperty } from "@sangonz193/utils/hasProperty"
import { GraphQLError } from "graphql/error/GraphQLError"
import { execute } from "graphql/execution/execute"
import { print } from "graphql/language/printer"
import { buildSchema } from "graphql/utilities/buildASTSchema"
import isObject from "lodash/isObject"

import { graphqlConfig } from "./graphql.config"
import type { Mutation, Query, Scalars } from "./remoteSchema.types"
import { possibleTypes } from "./remoteSchemaPossibleTypes"

type _ResolversParentTypes = {
	Query: Query
	Mutation: Mutation
}

const schemaPromise = import("./remoteSchema.graphql")

const getSchemaLink = setContext(async () => {
	return {
		schema: (await schemaPromise).remoteSchema,
	}
})

let getSchema = (context: Record<string, any>) => {
	const schema = buildSchema(print(context.schema))
	getSchema = () => schema

	return schema
}

export const ValidationAndCacheLink = () => {
	return new ApolloLink((operation, forward) => {
		const schema = getSchema(operation.getContext())

		return forward(operation).map((value) => {
			const execResult = execute({
				schema,
				document: operation.query,
				rootValue: value.data,
				variableValues: operation.variables,
			})

			const isPromise = (value: unknown): value is Promise<unknown> =>
				isObject(value) && hasProperty(value, "then") && typeof value.then === "function"

			value.errors = [new GraphQLError("Unexpected promise returned from `execute`")]

			return isPromise(execResult)
				? {
						data: {},
						graphQLErrors: [new GraphQLError("Unexpected promise returned from `execute`")],
				  }
				: {
						data: execResult.data ?? {},
						errors: execResult.errors,
				  }
		})
	})
}

type TypePolicies = {
	[K in keyof Omit<_ResolversParentTypes, keyof Scalars>]?: K extends keyof Resolvers ? TypePolicy : {}
}

export const createGraphqlClient = () => {
	const typePolicies: TypePolicies = {
		Query: {
			fields: {
				courseById: {
					read: (existing, options) =>
						existing || options.toReference({ __typename: "Course", id: options.args?.id }),
				},

				courseByCode: {
					read: (existing, options) => {
						if (existing) {
							return existing
						}

						const id = Object.values(cache.extract()).find(
							(i) => i?.__typename === "Course" && (i.code ?? "") === options.args?.code
						)?.id

						return options.toReference({ __typename: "Course", id })
					},
				},

				courseClassById: {
					read: (existing, options) =>
						existing || options.toReference({ __typename: "CourseClass", id: options.args?.id }),
				},

				courseClassListById: {
					read: (existing, options) =>
						existing || options.toReference({ __typename: "CourseClassList", id: options.args?.id }),
				},

				courseClassListByCode: {
					read: (existing, options) => {
						if (existing) {
							return existing
						}

						const id = Object.values(cache.extract()).find(
							(i) => i?.__typename === "CourseClassList" && (i.code ?? "") === options.args?.code
						)?.id

						return options.toReference({ __typename: "CourseClassList", id })
					},
				},

				courseEditionById: {
					read: (existing, options) =>
						existing || options.toReference({ __typename: "CourseEdition", id: options.args?.id }),
				},
			},
		},
	}

	const cache: InMemoryCache = new InMemoryCache({
		addTypename: true,
		possibleTypes,
		typePolicies: typePolicies as Required<typeof typePolicies>,
	})

	const apolloClient = new ApolloClient({
		connectToDevTools: true,
		link: ApolloLink.from([getSchemaLink, ValidationAndCacheLink(), new BatchHttpLink({ uri: graphqlConfig.uri })]),
		cache,
	})

	return apolloClient
}
