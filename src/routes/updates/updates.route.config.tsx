import { RouteConfig } from "../_utils/RouteConfig"
import { Updates } from "./Updates"

export const updatesRouteConfig: RouteConfig = {
	path: `/updates`,
	element: () => <Updates />,
	matchConfig: {
		path: `/updates`,
	},
}
