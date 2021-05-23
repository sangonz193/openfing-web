import { appConfig } from "../../app.config"
import type { RouteConfig } from "../_utils/RouteConfig"
import { Updates } from "./components/Updates"

export const updatesRouteConfig: RouteConfig = {
	path: `${appConfig.historyBasename}/updates`,
	element: () => <Updates />,
	matchConfig: {
		path: `${appConfig.historyBasename}/updates`,
	},
}
