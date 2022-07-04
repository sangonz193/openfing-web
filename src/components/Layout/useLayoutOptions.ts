import { useContext, useLayoutEffect } from "react"

import type { LayoutOptions } from "./Layout.context"
import { LayoutContext } from "./Layout.context"

export const useLayoutOptions = (options: Partial<LayoutOptions>) => {
	const { setLayoutOptions } = useContext(LayoutContext)

	useLayoutEffect(() => {
		setLayoutOptions(options)
		return () => setLayoutOptions({})
	}, Object.values(options))
}
