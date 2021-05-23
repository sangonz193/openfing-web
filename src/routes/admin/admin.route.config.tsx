import { appConfig } from "../../app.config"
import { RouteConfig } from "../_utils/RouteConfig"
import { Admin } from "./components/Admin"

export const adminRouteConfig: RouteConfig = {
	path: appConfig.historyBasename + `/admin`,
	element: () => <Admin />,
	matchConfig: {
		path: appConfig.historyBasename + `/admin`,
	},
}
