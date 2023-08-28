import { devtoolsExchange } from "@urql/devtools"
import type { AuthConfig } from "@urql/exchange-auth"
import { authExchange } from "@urql/exchange-auth"
// import { cacheExchange } from "@urql/exchange-graphcache"
import { Context, createClient, fetchExchange } from "urql"
import { z } from "zod"

import { useAuthStore } from "../auth"
// import introspection from "../gql/schema.json"
import { useRefWithInitializer } from "../hooks/useRefWithInitializer"
import { RefreshTokenDocument } from "./UrqlProvider.urqlGraphql"
import type { RefreshTokenMutation, RefreshTokenMutationVariables } from "./UrqlProvider.urqlGraphql.generated"

// TODO: add cacheExchange back in

export const UrqlProvider: React.FC = ({ children }) => {
	const authStore = useAuthStore()

	const client = useRefWithInitializer(() => {
		const client = createClient({
			url:
				z
					.string()
					.url()
					.parse(import.meta.env.VITE_SUPABASE_URL) + "/graphql/v1",
			exchanges: [
				devtoolsExchange,
				// cacheExchange({
				// 	schema: introspection,
				// }),
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
