import React from "react";

import { matchRouteConfig } from "../_utils/matchRouteConfig";
import { RouteConfig } from "../routeConfigMap";
import { useLocation } from "./useLocation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMatchRouteConfig = <T extends RouteConfig<any>>(routeConfig: T) => {
	const location = useLocation();

	return React.useMemo(() => matchRouteConfig(location.pathname, routeConfig), [location.pathname]);
};
