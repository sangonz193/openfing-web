import { Outlet, type RouteObject } from "react-router-dom"

import { appConfig } from "../../app.config"
import { useLayoutOptions } from "../../components/Layout/useLayoutOptions"
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
