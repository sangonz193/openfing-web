import merge from "lodash/merge"
import React from "react"
import { Outlet } from "react-router-dom"

import { cn } from "@/lib/cn"

import { useRootEventListeners } from "../../rootEventListeners/useRootEventListeners"
import { Header } from "../Header"
import { Navbar } from "../Navbar"
import type { LayoutOptions } from "./Layout.context"
import { LayoutContext } from "./Layout.context"

export const Layout: React.FC = () => {
	const { overriddenLayoutOptions } = React.useContext(LayoutContext)

	const layoutOptionsWithOverrides = React.useMemo(() => {
		const defaultOptions: LayoutOptions = {
			showHeader: true,
			showNavBar: true,
			headerTitle: "",
		}
		const options =
			typeof overriddenLayoutOptions === "function" ? overriddenLayoutOptions({}) : overriddenLayoutOptions

		return merge(defaultOptions, options)
	}, [overriddenLayoutOptions])

	const eventListeners = useRootEventListeners()

	return (
		<div
			className="grid h-full grid-rows-[auto_1fr_auto] md:grid-cols-[auto_1fr]"
			{...eventListeners}
			tabIndex={0} // Necessary for eventListeners to fire
		>
			{layoutOptionsWithOverrides.showHeader && (
				<Header
					title={layoutOptionsWithOverrides.headerTitle}
					left={layoutOptionsWithOverrides.headerLeft}
					right={layoutOptionsWithOverrides.headerRight}
					className="shrink-0"
				/>
			)}

			<div
				className={cn(
					"flex shrink grow basis-full flex-col bg-background md:col-start-2",
					!layoutOptionsWithOverrides.showHeader && "row-span-2"
				)}
			>
				<Outlet />
			</div>

			{layoutOptionsWithOverrides.showNavBar && (
				<Navbar className="row-span-full row-start-3 shrink-0 md:col-start-1 md:row-start-1 md:grid-flow-row-dense" />
			)}
		</div>
	)
}
