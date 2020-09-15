import React from "react";

import { dangerousKeysOf } from "../_utils/dangerousKeysOf";
import { matchRouteConfig } from "../_utils/matchRouteConfig";
import { RouteConfig, routeConfigMap } from "../routeConfigMap";
import { useLocation } from "./useLocation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRoutes = <T extends {}>(): [RouteConfig<any>, T] | null => {
	const location = useLocation();

	return React.useMemo(() => {
		for (const key of dangerousKeysOf(routeConfigMap)) {
			const routeConfig = routeConfigMap[key];

			const match = matchRouteConfig(location.pathname, routeConfig);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			if (match) return [routeConfig, ((match.params as unknown) as any) || {}];
		}

		return null;
	}, [location.pathname]);
};
