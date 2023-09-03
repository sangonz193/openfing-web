import { Outlet, type RouteObject } from "react-router-dom"

import { useScreenTitle } from "@/hooks/useScreenTitle"

import { appConfig } from "../../app.config"

export const faqsRouteConfig = {
	path: `${appConfig.historyBasename}/faqs`,
	Component: function FaqsWrapper() {
		const title = "FAQs"
		useScreenTitle(title)

		return <Outlet />
	},
	children: [
		{
			index: true,
			lazy: () => import("./faqs").then(({ Faqs }) => ({ Component: Faqs })),
		},
	],
} satisfies RouteObject
