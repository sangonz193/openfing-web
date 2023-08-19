import { useObservableStates } from "../hooks/useObservableStates"
import { useAuthStore } from "./useAuthStore"

export function useIsAuthenticated() {
	const { grant } = useObservableStates(useAuthStore(), ["grant"])

	return !!grant?.token
}
