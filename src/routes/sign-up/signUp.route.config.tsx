import { appConfig } from "../../app.config"
import type { RouteConfig } from "../_utils/RouteConfig"
import { SignUp } from "./components/SignUp"

export const updatesRouteConfig: RouteConfig = {
	path: appConfig.historyBasename + `/sign-up`,
	element: () => <SignUp />,
	matchConfig: {
		path: appConfig.historyBasename + `/sign-up`,
	},
}
