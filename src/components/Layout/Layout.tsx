import { Stack } from "@fluentui/react"
import merge from "lodash/merge"
import React from "react"

import { useRootEventListeners } from "../../modules/RootEventListeners/useRootEventListeners"
import { Header } from "../Header"
import { Navbar } from "../Navbar"
import type { LayoutContextValue, LayoutOptions, SetLayoutOptions } from "./Layout.context"
import { LayoutContext } from "./Layout.context"
import { useLayoutStyles } from "./useLayoutStyles"

export type LayoutProps = LayoutOptions & {
	children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = (props) => {
	const { children } = props
	const [overriddenLayoutOptions, setOverriddenLayoutOptions] = React.useState<SetLayoutOptions>()

	const contextValue = React.useMemo<LayoutContextValue>(() => {
		return {
			setLayoutOptions: setOverriddenLayoutOptions,
		}
	}, [])

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

	const styles = useLayoutStyles({
		className: layoutOptionsWithOverrides?.className,
	})

	const eventListeners = useRootEventListeners()

	return (
		<LayoutContext.Provider value={contextValue}>
			<div className={styles.wrapper} {...eventListeners}>
				<Stack className={styles.contentAndHeaderContainer}>
					{layoutOptionsWithOverrides.showHeader && (
						<Header
							title={layoutOptionsWithOverrides.headerTitle}
							left={layoutOptionsWithOverrides.headerLeft}
							right={layoutOptionsWithOverrides.headerRight}
						/>
					)}
					<Stack className={styles.componentContainer}>{children}</Stack>
				</Stack>

				{layoutOptionsWithOverrides.showNavBar && <Navbar />}
			</div>
		</LayoutContext.Provider>
	)
}
