import { RouteConfig } from "../_utils/RouteConfig";
import { Courses } from "./Courses";

export const coursesRouteConfig: RouteConfig = {
	path: `/courses`,
	element: () => <Courses />,
	matchConfig: {
		path: `/courses`,
	},
};
