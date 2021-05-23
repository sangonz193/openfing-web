import type { Location } from "history"
import React from "react"

import { useHistory } from "./useHistory"

export const useLocation = (): Location => {
	const [, forceUpdate] = React.useState<{}>()
	const history = useHistory()
	const { location } = history

	React.useEffect(() => {
		const listener = history.listen(() => {
			forceUpdate({})
		})

		if (location !== history.location) {
			forceUpdate({})
		}

		return () => listener()
	}, [])

	return history.location
}
