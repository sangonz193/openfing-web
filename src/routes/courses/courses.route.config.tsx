import type { RouteObject } from "react-router-dom"
import { Outlet } from "react-router-dom"

import { useScreenTitle } from "@/hooks/useScreenTitle"

import { appConfig } from "../../app.config"

export const coursesRouteConfig = {
	path: `${appConfig.historyBasename}/courses`,
	Component: function CoursesWrapper() {
		const title = "Cursos"
		useScreenTitle(title)

		return <Outlet />
	},
	children: [
		{
			index: true,
			lazy: () => import("./components/Courses").then(({ Courses }) => ({ Component: Courses })),
		},
	],
} satisfies RouteObject
