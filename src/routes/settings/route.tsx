import { appConfig } from "../../app.config"
import type { RouteConfig } from "../_utils/RouteConfig"
import { Settings } from "./settings"

export const settingsRouteConfig: RouteConfig = {
	path: `${appConfig.historyBasename}/settings`,
	element: () => <Settings />,
	matchConfig: {
		path: `${appConfig.historyBasename}/settings`,
	},
}
