import { useReactiveVars } from "../../hooks/useReactiveVars"
import { useAuthStore } from "./useAuthStore"

export function useIsAuthenticated() {
	const { data } = useReactiveVars(useAuthStore(), ["data"])

	return !!data
}
