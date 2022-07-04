import { useCallback, useEffect } from "react"

import { useObservableStates } from "../../hooks/useObservableStates"
import { useBlockInitialization, useOnReset } from "../Initialization"
import { authLocalStorage } from "./Auth.storage"
import { useAuthStore } from "./useAuthStore"
import { useInitialRefreshToken } from "./useInitialRefreshToken"

export const AuthManager: React.FC = () => {
	const unblockInitialization = useBlockInitialization()
	const authStore = useAuthStore()

	const [, tryRefreshToken] = useInitialRefreshToken({ unblockInitialization })
	useEffect(() => {
		tryRefreshToken()
	}, [])

	const { grant } = useObservableStates(authStore, ["grant"])
	useEffect(() => {
		authStore.grant.next(grant ?? undefined)
		if (grant) {
			authLocalStorage.setItem("refreshToken", grant.refreshToken)
		}
	}, [grant?.refreshToken])

	useOnReset(
		useCallback(async () => {
			await authLocalStorage.removeItem("refreshToken")
		}, [])
	)

	return null
}
