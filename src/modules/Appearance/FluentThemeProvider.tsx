import { ThemeProvider } from "@fluentui/react"
import React from "react"

import { lightTheme } from "../../styles/themes/lightTheme"
import { AppearanceContext } from "./Appearance.context"

const themeProviderStyle = { height: "100%" }

export const FluentThemeProvider: React.FC = ({ children }) => {
	const store = React.useContext(AppearanceContext)
	const [theme, setTheme] = React.useState(lightTheme)

	React.useEffect(() => {
		if (typeof store === "function") {
			return
		}

		setTheme(store.currentTheme.getValue())
		const subscription = store.currentTheme.subscribe((newValue) => {
			setTheme(newValue)
		})

		return () => subscription.unsubscribe()
	}, [store])

	return (
		<ThemeProvider theme={theme} style={themeProviderStyle}>
			{children}
		</ThemeProvider>
	)
}
