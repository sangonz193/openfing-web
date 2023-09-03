import { Outlet, type RouteObject } from "react-router-dom"

import { useScreenTitle } from "@/hooks/useScreenTitle"

import { appConfig } from "../../app.config"

export const signUpRouteConfig = {
	path: appConfig.historyBasename + `/sign-up`,
	Component: function SignUpWrapper() {
		const title = "Registro"
		useScreenTitle(title)

		return <Outlet />
	},
	children: [
		{
			index: true,
			lazy: () => import("./components/SignUp").then(({ SignUp }) => ({ Component: SignUp })),
		},
	],
} satisfies RouteObject
