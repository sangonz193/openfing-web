import { useMemo } from "react"
import { Outlet } from "react-router-dom"

import { cn } from "@/lib/cn"
import { withWrappers } from "@/react/withWrapper"
import { useRootEventListeners } from "@/rootEventListeners/useRootEventListeners"

import { Header } from "../Header"
import { Navbar } from "../Navbar"
import type { LayoutOptions } from "./context"
import { LayoutProvider, useLayoutContext } from "./context"

function LayoutInner() {
	const context = useLayoutContext()
	const options = useMemo(
		() =>
			context.overrides.reduce<LayoutOptions>((acc, override) => ({ ...acc, ...override.options }), {
				showHeader: true,
				showNavBar: true,
			}),
		[context.overrides]
	)

	const eventListeners = useRootEventListeners()

	return (
		<div
			className={cn("grid h-full grid-rows-[auto_1fr_auto] md:grid-cols-[auto_1fr]", options.className)}
			{...eventListeners}
			tabIndex={0} // Necessary for eventListeners to fire
		>
			{options.showHeader && (
				<Header
					title={options.headerTitle}
					left={options.headerLeft}
					right={options.headerRight}
					className="shrink-0"
				/>
			)}

			<div
				className={cn(
					"flex shrink grow basis-full flex-col bg-background md:col-start-2",
					!options.showHeader && "row-span-2"
				)}
			>
				<Outlet />
			</div>

			{options.showNavBar && (
				<Navbar className="row-span-full row-start-3 shrink-0 md:col-start-1 md:row-start-1 md:grid-flow-row-dense" />
			)}
		</div>
	)
}

export const Layout = withWrappers([LayoutProvider], LayoutInner)
