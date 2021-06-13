import { useIsAuthenticated } from "../modules/Auth"
import { homeRouteConfig } from "../routes/home/home.route.config"
import { useRedirect } from "./useRedirect"

export function useRedirectToHomeIfAuthenticated(): boolean {
	const isAuthenticated = useIsAuthenticated()
	useRedirect(homeRouteConfig.path, !isAuthenticated)

	return isAuthenticated
}
