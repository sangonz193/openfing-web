import type { RouteConfig } from "../_utils/RouteConfig"
import { Courses } from "./components/Courses"

export const coursesRouteConfig: RouteConfig = {
	path: `/courses`,
	element: () => <Courses />,
	matchConfig: {
		path: `/courses`,
	},
}
