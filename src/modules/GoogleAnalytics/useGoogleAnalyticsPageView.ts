import { useEffect } from "react"

import { useHistory } from "../Navigation/useHistory"
import { registerPageView } from "./registerPageView"

export type GoogleAnalyticsOptions = {
	title: string
	skip?: boolean
}

export function useGoogleAnalyticsPageView({ title, skip }: GoogleAnalyticsOptions) {
	const history = useHistory()
	useEffect(() => {
		if (skip) {
			return
		}

		registerPageView({
			title: title,
			path: history.location.pathname,
		})
	}, [skip])
}
