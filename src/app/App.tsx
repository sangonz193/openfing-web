import React from "react"

import { Layout } from "../components/Layout"
import { useRoutes } from "../hooks/useRoutes"

export type AppProps = {
	children?: never
}

export const App: React.FC<AppProps> = ({}) => {
	const [routeConfig, params = {}] = useRoutes() || []

	const Component = routeConfig?.element

	return <Layout>{Component && React.createElement(Component as any, params)}</Layout>
}
