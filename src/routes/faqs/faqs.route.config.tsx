import { RouteConfig } from "../_utils/RouteConfig"
import { Faqs } from "./components/Faqs"

export const faqsRouteConfig: RouteConfig = {
	path: `/faqs`,
	element: () => <Faqs />,
	matchConfig: {
		path: `/faqs`,
	},
}
