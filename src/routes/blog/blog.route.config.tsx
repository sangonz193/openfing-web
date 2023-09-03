import type { RouteObject } from "react-router-dom"
import { Outlet } from "react-router-dom"

import { useScreenTitle } from "@/hooks/useScreenTitle"

import { appConfig } from "../../app.config"

export const blogRouteConfig = {
	path: `${appConfig.historyBasename}/blog`,
	Component: function BlogWrapper() {
		const title = "Blog"
		useScreenTitle(title)

		return <Outlet />
	},
	children: [
		{
			index: true,
			lazy: () => import("./components/Blog").then(({ Blog }) => ({ Component: Blog })),
		},
	],
} satisfies RouteObject
