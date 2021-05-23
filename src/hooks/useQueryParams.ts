import queryString from "query-string"
import React from "react"

import { useHistory } from "../modules/Navigation/useHistory"

export const useQueryParams = <T extends string>() => {
	const history = useHistory()

	return React.useMemo(
		() => queryString.parse(history.location.search) as Record<T, string | string[]>,
		[history.location.search]
	)
}
