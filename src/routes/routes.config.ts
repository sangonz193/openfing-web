import { courseRouteConfig } from "./courses/course/course.route.config";
import { coursesRouteConfig } from "./courses/courses.route.config";
import { faqsRouteConfig } from "./faqs/faqs.route.config";
import { homeRouteConfig } from "./home/home.route.config";
import { settingsRouteConfig } from "./settings/settings.route.config";
import { updatesRouteConfig } from "./updates/updates.route.config";

export const routesConfig = {
	home: homeRouteConfig,
	courses: coursesRouteConfig,
	course: courseRouteConfig,
	updates: updatesRouteConfig,
	faqs: faqsRouteConfig,
	settings: settingsRouteConfig,
};
