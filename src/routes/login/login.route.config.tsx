import { Outlet, type RouteObject } from "react-router-dom"

import { useLayoutOptions } from "@/components/layout/context"

import { appConfig } from "../../app.config"
import { useRedirectToCoursesIfAuthenticated } from "../../hooks/useRedirectToCoursesIfAuthenticated"
import { useScreenTitle } from "../../hooks/useScreenTitle"

export const loginRouteConfig = {
	path: appConfig.historyBasename + `/login`,
	Component: function LoginWrapper() {
		useRedirectToCoursesIfAuthenticated()

		const title = "Inicio de sesión"
		useScreenTitle(title)

		useLayoutOptions({
			showHeader: false,
			showNavBar: false,
		})

		return <Outlet />
	},
	children: [
		{
			index: true,
			lazy: () => import("./components/Login/Login").then(({ Login }) => ({ Component: Login })),
		},
	],
} satisfies RouteObject
