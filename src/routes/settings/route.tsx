import { Outlet, type RouteObject } from "react-router-dom"

import { useScreenTitle } from "@/hooks/useScreenTitle"

import { appConfig } from "../../app.config"

export const settingsRouteConfig = {
	path: `${appConfig.historyBasename}/settings`,
	Component: function SettingsWrapper() {
		const title = "Ajustes"
		useScreenTitle(title)

		return <Outlet />
	},
	children: [
		{
			index: true,
			lazy: () => import("./settings").then(({ Settings }) => ({ Component: Settings })),
		},
	],
} satisfies RouteObject
