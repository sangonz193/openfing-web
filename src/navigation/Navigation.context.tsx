import type { History } from "history"
import { createBrowserHistory } from "history"
import { debounce } from "lodash"
import React from "react"
import ReactPiwik from "react-piwik"

// import { appConfig } from "../../app.config"
import { useRefWithInitializer } from "../hooks/useRefWithInitializer"

export const NavigationContext = React.createContext<History>(null as unknown as History)

const piwik = new ReactPiwik({
	siteId: 5,
	url: "https://www.fing.edu.uy/matomo",
})

export const NavigationProvider: React.FC = ({ children }) => {
	const history = useRefWithInitializer(() => {
		const history = createBrowserHistory()

		// if (appConfig.production) {
		piwik.connectToHistory(history, true)

		const fireGtagDebounce = debounce(() => gtag("config", "UA-0000000-1"), 200)

		history.listen(() => {
			fireGtagDebounce()
		})
		// }

		return history
	}).current

	return <NavigationContext.Provider value={history}>{children}</NavigationContext.Provider>
}
