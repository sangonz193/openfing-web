import { appConfig } from "../../app.config"
import type { RouteConfig } from "../_utils/RouteConfig"
import { Faqs } from "./faqs"

export const faqsRouteConfig: RouteConfig = {
	path: `${appConfig.historyBasename}/faqs`,
	element: () => <Faqs />,
	matchConfig: {
		path: `${appConfig.historyBasename}/faqs`,
	},
}
