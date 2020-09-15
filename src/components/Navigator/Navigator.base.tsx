import React from "react";

import { useRoutes } from "../../hooks/useRoutes";
import { Layout } from "../Layout";

export const NavigatorBase = () => {
	const [routeConfig, params] = useRoutes() || [];

	if (!routeConfig) return null;

	return <Layout routeKey={routeConfig.path}>{routeConfig.element(params) || null}</Layout>;
};
