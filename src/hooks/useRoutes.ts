import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import React from "react"

import { matchRouteConfig } from "../navigation/matchRouteConfig"
import { useLocation } from "../navigation/useLocation"
import type { RouteConfig } from "../routes/_utils/RouteConfig"
import { routesConfig } from "../routes/routes.config"

export const useRoutes = <T extends {}>(): [RouteConfig<any>, T] | null => {
	const location = useLocation()

	return React.useMemo(() => {
		for (const key of dangerousKeysOf(routesConfig)) {
			const routeConfig = routesConfig[key]

			const match = matchRouteConfig(location.pathname, routeConfig)

			if (match) {
				return [routeConfig, (match.params as unknown as any) || {}]
			}
		}

		return null
	}, [location.pathname])
}
