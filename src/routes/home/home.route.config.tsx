import { appConfig } from "../../app.config"
import type { RouteConfig } from "../_utils/RouteConfig"
import { Home } from "./components/Home"

export const homeRouteConfig: RouteConfig = {
	path: appConfig.historyBasename || "/",
	element: () => <Home />,
	matchConfig: {
		path: appConfig.historyBasename || "/",
	},
}
