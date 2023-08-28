import { Redirect } from "../navigation/Redirect"
import type { RouteConfig } from "./_utils/RouteConfig"
import { blogRouteConfig } from "./blog/blog.route.config"
import { courseRouteConfig } from "./courses/course/course.route.config"
import { coursesRouteConfig } from "./courses/courses.route.config"
import { faqsRouteConfig } from "./faqs/route"
import { homeRouteConfig } from "./home/home.route.config"
import { loginRouteConfig } from "./login/login.route.config"
import { settingsRouteConfig } from "./settings/settings.route.config"
import { signUpRouteConfig } from "./sign-up/signUp.route.config"
import { updatesRouteConfig } from "./updates/updates.route.config"

const redirectConfig: RouteConfig = {
	path: "",
	element: () => <Redirect to={coursesRouteConfig.path} />,
	matchConfig: {
		path: "/",
		exact: false,
	},
}

export const routesConfig = {
	"sign-up": signUpRouteConfig,
	blog: blogRouteConfig,
	home: homeRouteConfig,
	course: courseRouteConfig,
	courses: coursesRouteConfig,
	faqs: faqsRouteConfig,
	login: loginRouteConfig,
	settings: settingsRouteConfig,
	updates: updatesRouteConfig,

	redirect: redirectConfig,
}
