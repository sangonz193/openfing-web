import { Redirect } from "../components/Redirect"
import type { RouteConfig } from "./_utils/RouteConfig"
import { adminRouteConfig } from "./admin/admin.route.config"
import { courseRouteConfig } from "./courses/course/course.route.config"
import { coursesRouteConfig } from "./courses/courses.route.config"
import { faqsRouteConfig } from "./faqs/faqs.route.config"
import { homeRouteConfig } from "./home/home.route.config"
import { loginRouteConfig } from "./login/login.route.config"
import { settingsRouteConfig } from "./settings/settings.route.config"
import { signUpRouteConfig } from "./sign-up/signUp.route.config"
import { updatesRouteConfig } from "./updates/updates.route.config"

const redirectConfig: RouteConfig = {
	path: "",
	element: () => <Redirect to={homeRouteConfig.path} />,
	matchConfig: {
		path: "/",
		exact: false,
	},
}

export const routesConfig = {
	"sign-up": signUpRouteConfig,
	admin: adminRouteConfig,
	course: courseRouteConfig,
	courses: coursesRouteConfig,
	faqs: faqsRouteConfig,
	home: homeRouteConfig,
	login: loginRouteConfig,
	redirect: redirectConfig,
	settings: settingsRouteConfig,
	updates: updatesRouteConfig,
}
