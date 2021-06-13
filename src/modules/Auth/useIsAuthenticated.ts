import { useReactiveVars } from "../../hooks/useReactiveVars"
import { useAuthStore } from "./useAuthStore"

export function useIsAuthenticated() {
	const { data, secret } = useReactiveVars(useAuthStore(), ["data", "secret"])

	return !!data || !!secret
}
