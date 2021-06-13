import { appConfig } from "../../app.config"
import type { RouteConfig } from "../_utils/RouteConfig"
import { Login } from "./components/Login"

export const loginRouteConfig: RouteConfig = {
	path: appConfig.historyBasename + `/login`,
	element: () => <Login />,
	matchConfig: {
		path: appConfig.historyBasename + `/login`,
	},
}
