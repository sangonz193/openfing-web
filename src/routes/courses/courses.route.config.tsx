import { appConfig } from "../../app.config"
import type { RouteConfig } from "../_utils/RouteConfig"
import { Courses } from "./components/Courses"

export const coursesRouteConfig: RouteConfig = {
	path: `${appConfig.historyBasename}/courses`,
	element: () => <Courses />,
	matchConfig: {
		path: `${appConfig.historyBasename}/courses`,
	},
}
