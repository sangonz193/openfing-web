import React from "react"

import type { LayoutContextValue, SetLayoutOptions } from "./Layout.context"
import { LayoutContext } from "./Layout.context"

export const LayoutProvider: React.FC<{}> = ({ children }) => {
	// TODO: handle multiple calls to setLayoutOptions
	const [overriddenLayoutOptions, setOverriddenLayoutOptions] = React.useState<SetLayoutOptions>()
	const contextValue = React.useMemo<LayoutContextValue>(
		() => ({
			overriddenLayoutOptions: overriddenLayoutOptions,
			setLayoutOptions: setOverriddenLayoutOptions,
		}),
		[overriddenLayoutOptions]
	)

	return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>
}
