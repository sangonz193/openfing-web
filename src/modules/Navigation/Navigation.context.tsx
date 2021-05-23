import type { History } from "history"
import { createBrowserHistory } from "history"
import PiwikReactRouter from "piwik-react-router"
import React from "react"
import ReactGA from "react-ga"

import { appConfig } from "../../app.config"
import { useRefWithInitializer } from "../../hooks/useRefWithInitializer"

export const NavigationContext = React.createContext<History>((null as unknown) as History)

export const NavigationProvider: React.FC = ({ children }) => {
	const history = useRefWithInitializer(() => {
		const history = createBrowserHistory()

		if (appConfig.production) {
			const piwik = PiwikReactRouter({
				siteId: 5,
				url: "https://www.fing.edu.uy/matomo",
			})
			piwik.connectToHistory(history)

			ReactGA.initialize("UA-141045691-1", {})
			history.listen(() => {
				ReactGA.pageview(window.location.pathname + window.location.search)
			})
		}

		return history
	}).current

	return <NavigationContext.Provider value={history}>{children}</NavigationContext.Provider>
}
