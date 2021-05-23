import React from "react"

import { LayoutOptions } from "./Layout.context"
import { LayoutContext } from "./Layout.context"

export const useLayoutOptions = (options: Partial<LayoutOptions>) => {
	const { setLayoutOptions } = React.useContext(LayoutContext)

	React.useEffect(() => {
		setLayoutOptions(options)
		return () => setLayoutOptions({})
	}, Object.values(options))
}
