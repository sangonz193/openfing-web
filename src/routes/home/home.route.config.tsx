import { Outlet, type RouteObject } from "react-router-dom"

import { useLayoutOptions } from "@/components/layout/context"
import { useScreenTitle } from "@/hooks/useScreenTitle"

export const homeRouteConfig = {
	path: "/",
	Component: function HomeWrapper() {
		const title = "Inicio"
		useScreenTitle(title)

		useLayoutOptions({
			showHeader: false,
		})

		return <Outlet />
	},
	children: [
		{
			index: true,
			lazy: () => import("./components/Home/Home").then(({ Home }) => ({ Component: Home })),
		},
	],
} satisfies RouteObject
