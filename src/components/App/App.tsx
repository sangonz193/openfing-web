import React from "react"

import { useRoutes } from "../../hooks/useRoutes"
import { Layout } from "../Layout"

export type AppProps = {
	children?: never
}

export const App: React.FC<AppProps> = ({}) => {
	const [routeConfig, params = {}] = useRoutes() || []

	const Component = routeConfig?.element

	return <Layout>{Component && React.createElement(Component as any, params)}</Layout>
}
