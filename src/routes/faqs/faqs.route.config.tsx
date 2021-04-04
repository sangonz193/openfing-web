import { RouteConfig } from "../_utils/RouteConfig";
import { Faqs } from "./Faqs";

export const faqsRouteConfig: RouteConfig = {
	path: `/faqs`,
	element: () => <Faqs />,
	matchConfig: {
		path: `/faqs`,
	},
};
