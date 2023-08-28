import { devtoolsExchange } from "@urql/devtools"
import type { AuthConfig } from "@urql/exchange-auth"
import { authExchange } from "@urql/exchange-auth"
import { useState } from "react"
import { Context, createClient, fetchExchange } from "urql"
import { z } from "zod"

import { useAuthStore } from "../auth"
import { RefreshTokenDocument } from "./UrqlProvider.urqlGraphql"
import type { RefreshTokenMutation, RefreshTokenMutationVariables } from "./UrqlProvider.urqlGraphql.generated"

// TODO: add cacheExchange back in

export const UrqlProvider: React.FC = ({ children }) => {
	const authStore = useAuthStore()
	const { VITE_SUPABASE_URL, VITE_SUPABASE_KEY } = z
		.object({
			VITE_SUPABASE_URL: z.string().url(),
			VITE_SUPABASE_KEY: z.string(),
		})
		.parse({
			VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
			VITE_SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY,
		})

	const [client] = useState(() => {
		const client = createClient({
			url: VITE_SUPABASE_URL + "/graphql/v1",
			exchanges: [
				devtoolsExchange,
				authExchange(
					// TODO: replace w/ supabase auth
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

			fetchOptions: function createFetchOptions() {
				return {
					headers: {
						apikey: VITE_SUPABASE_KEY,
					},
				}
			},
		})

		return client
	})

	return <Context.Provider value={client}>{children}</Context.Provider>
}
