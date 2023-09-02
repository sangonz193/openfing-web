import merge from "lodash/merge"
import React from "react"

import { useRootEventListeners } from "../../rootEventListeners/useRootEventListeners"
import { Header } from "../Header"
import { Navbar } from "../Navbar"
import type { LayoutOptions } from "./Layout.context"
import { LayoutContext } from "./Layout.context"

export type LayoutProps = LayoutOptions & {
	children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = (props) => {
	const { children } = props
	const { overriddenLayoutOptions } = React.useContext(LayoutContext)

	const layoutOptionsWithOverrides = React.useMemo(() => {
		const defaultOptions: LayoutOptions = {
			showHeader: true,
			showNavBar: true,
			headerTitle: "",
		}
		const options =
			typeof overriddenLayoutOptions === "function"
				? overriddenLayoutOptions({ ...props })
				: overriddenLayoutOptions

		return merge(defaultOptions, options)
	}, [overriddenLayoutOptions, props])

	const eventListeners = useRootEventListeners()

	return (
		<>
			<div className="flex h-full flex-col md:flex-row-reverse" {...eventListeners}>
				<div className="flex h-full min-h-0 shrink grow basis-auto flex-col">
					{layoutOptionsWithOverrides.showHeader && (
						<Header
							title={layoutOptionsWithOverrides.headerTitle}
							left={layoutOptionsWithOverrides.headerLeft}
							right={layoutOptionsWithOverrides.headerRight}
							className="shrink-0"
						/>
					)}

					<div className="flex shrink grow basis-full flex-col bg-background">{children}</div>
				</div>

				{layoutOptionsWithOverrides.showNavBar && <Navbar className="shrink-0" />}
			</div>
		</>
	)
}
