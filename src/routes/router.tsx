import { useEffect } from "react"
import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom"

import { Layout } from "@/components/new-layout/layout"
import { renderWithContext } from "@/renderWithContext"

import { blogRouteConfig } from "./blog/blog.route.config"
import { coursesRouteConfig } from "./courses/courses.route.config"
import { faqsRouteConfig } from "./faqs/route"
import { homeRouteConfig } from "./home/home.route.config"
import { loginRouteConfig } from "./login/login.route.config"
import { settingsRouteConfig } from "./settings/route"
import { signUpRouteConfig } from "./sign-up/signUp.route.config"
import { updatesRouteConfig } from "./updates/updates.route.config"

export const router = createBrowserRouter([
	{
		element: renderWithContext(<Outlet />),
		children: [
			{
				path: "/",
				element: <Layout />,
				children: [
					signUpRouteConfig,
					blogRouteConfig,
					homeRouteConfig,
					coursesRouteConfig,
					faqsRouteConfig,
					settingsRouteConfig,
					updatesRouteConfig,
					loginRouteConfig,
				],
			},
		],
	},
	{
		path: "*",
		element: <RedirectToCourses />,
	},
])

function RedirectToCourses() {
	const navigate = useNavigate()

	useEffect(() => {
		navigate(coursesRouteConfig.path, { replace: true })
	}, [])

	return null
}
