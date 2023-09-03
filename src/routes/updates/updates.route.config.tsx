import type { RouteObject } from "react-router-dom"
import { Outlet } from "react-router-dom"

import { useScreenTitle } from "@/hooks/useScreenTitle"

import { appConfig } from "../../app.config"

export const updatesRouteConfig = {
	path: `${appConfig.historyBasename}/updates`,
	Component: function UpdatesWrapper() {
		const title = "Últimas"
		useScreenTitle(title)

		return <Outlet />
	},
	children: [
		{
			index: true,
			lazy: () => import("./components/Updates").then(({ Updates }) => ({ Component: Updates })),
		},
	],
} satisfies RouteObject
