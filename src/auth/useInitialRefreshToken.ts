import { useEffect, useState } from "react"

import { authLocalStorage } from "./Auth.storage"
import { useAuthStore } from "./useAuthStore"
import { useRefreshTokenMutation } from "./useInitialRefreshToken.urqlGraphql.generated"

export type UseInitialRefreshTokenOptions = {
	unblockInitialization?: () => void
}

export function useInitialRefreshToken(options: UseInitialRefreshTokenOptions) {
	const { unblockInitialization } = options
	const authStore = useAuthStore()
	const [state, refreshTokenMutation] = useRefreshTokenMutation()
	const [delayedFetching, setDelayedFetching] = useState(state.fetching)

	useEffect(() => {
		if (state.fetching) {
			setDelayedFetching(true)
			return
		}

		const timeout = setTimeout(() => {
			setDelayedFetching(false)
		}, 1000)

		return () => clearTimeout(timeout)
	}, [state.fetching])

	return [
		{ ...state, fetching: state.fetching || delayedFetching },
		async () => {
			const refreshToken = await authLocalStorage.getItem("refreshToken")
			if (!refreshToken) {
				unblockInitialization?.()
				return
			}

			authStore.grant.next({ refreshToken: refreshToken })

			const response = await refreshTokenMutation({
				input: {
					refreshToken: refreshToken,
				},
			})

			if (response.data?.refreshToken.__typename === "RefreshTokenPayload") {
				authStore.grant.next(response.data.refreshToken.grant)
			}

			unblockInitialization?.()
		},
	] as const
}
