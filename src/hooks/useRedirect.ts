import React from "react"

import { useHistory } from "../navigation/useHistory"

export function useRedirect(to: string, skip: boolean = false) {
	const history = useHistory()

	React.useEffect(() => {
		if (skip) {
			return
		}

		history.replace(to)
	}, [skip])
}
