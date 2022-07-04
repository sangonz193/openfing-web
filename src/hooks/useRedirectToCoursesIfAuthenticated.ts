import { useIsAuthenticated } from "../modules/Auth"
import { coursesRouteConfig } from "../routes/courses/courses.route.config"
import { useRedirect } from "./useRedirect"

export function useRedirectToCoursesIfAuthenticated(): boolean {
	const isAuthenticated = useIsAuthenticated()
	useRedirect(coursesRouteConfig.path, !isAuthenticated)

	return isAuthenticated
}
