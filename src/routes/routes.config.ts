import React from "react"

import { Redirect } from "../components/Redirect"
import type { RouteConfig } from "./_utils/RouteConfig"
import { adminRouteConfig } from "./admin/admin.route.config"
import { courseRouteConfig } from "./courses/course/course.route.config"
import { coursesRouteConfig } from "./courses/courses.route.config"
import { faqsRouteConfig } from "./faqs/faqs.route.config"
import { homeRouteConfig } from "./home/home.route.config"
import { settingsRouteConfig } from "./settings/settings.route.config"
import { updatesRouteConfig } from "./updates/updates.route.config"

const redirectConfig: RouteConfig = {
	path: "",
	element: () =>
		React.createElement(Redirect, {
			to: homeRouteConfig.path,
		}),
	matchConfig: {
		path: "/",
		exact: false,
	},
}

export const routesConfig = {
	home: homeRouteConfig,
	courses: coursesRouteConfig,
	course: courseRouteConfig,
	updates: updatesRouteConfig,
	faqs: faqsRouteConfig,
	settings: settingsRouteConfig,
	admin: adminRouteConfig,
	redirect: redirectConfig,
}
