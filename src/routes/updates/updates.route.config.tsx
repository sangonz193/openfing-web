import type { RouteConfig } from "../_utils/RouteConfig"
import { Updates } from "./components/Updates"

export const updatesRouteConfig: RouteConfig = {
	path: `/updates`,
	element: () => <Updates />,
	matchConfig: {
		path: `/updates`,
	},
}
