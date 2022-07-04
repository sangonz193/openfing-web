import React from "react"

import { appConfig } from "../../app.config"
import { useLayoutOptions } from "../../components/Layout/useLayoutOptions"
import { useRedirectToCoursesIfAuthenticated } from "../../hooks/useRedirectToCoursesIfAuthenticated"
import { useScreenTitle } from "../../hooks/useScreenTitle"
import { useGoogleAnalyticsPageView } from "../../modules/GoogleAnalytics/useGoogleAnalyticsPageView"
import type { RouteConfig } from "../_utils/RouteConfig"

const Login = React.lazy(async () => ({ default: (await import("./components/Login")).Login }))

export const loginRouteConfig: RouteConfig = {
	path: appConfig.historyBasename + `/login`,
	element: () => {
		useRedirectToCoursesIfAuthenticated()

		const title = "Inicio de sesión"
		useScreenTitle(title)
		useGoogleAnalyticsPageView({ title: title })

		useLayoutOptions({
			showHeader: false,
			showNavBar: false,
		})

		return (
			<React.Suspense fallback={null}>
				<Login />
			</React.Suspense>
		)
	},
	matchConfig: {
		path: appConfig.historyBasename + `/login`,
	},
}
