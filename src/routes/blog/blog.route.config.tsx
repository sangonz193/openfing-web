import { appConfig } from "../../app.config"
import type { RouteConfig } from "../_utils/RouteConfig"
import { Blog } from "./components/Blog"

export const blogRouteConfig: RouteConfig = {
	path: `${appConfig.historyBasename}/blog`,
	element: () => <Blog />,
	matchConfig: {
		path: `${appConfig.historyBasename}/blog`,
	},
}
