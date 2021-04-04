import { ThemeProvider } from "@fluentui/react";
import React from "react";

import { listenVar } from "../../_utils/listenVar";
import { lightTheme } from "../../styles/themes/lightTheme";
import { AppearanceStore } from "./Appearance.store";

export type AppearanceContextValue = AppearanceStore | ((store: AppearanceStore) => void);

export const AppearanceContext = React.createContext<AppearanceContextValue>(
	(null as unknown) as AppearanceContextValue
);

const themeProviderStyle = { height: "100%" };

const FluentThemeProvider: React.FC = ({ children }) => {
	const store = React.useContext(AppearanceContext);
	const [theme, setTheme] = React.useState(lightTheme);

	React.useEffect(() => {
		if (typeof store === "function") {
			return;
		}

		setTheme(store.currentTheme());
		const listener = listenVar(store.currentTheme, (newValue) => {
			setTheme(newValue);
		});

		return () => {
			listener();
		};
	}, [store]);

	return (
		<ThemeProvider theme={theme} style={themeProviderStyle}>
			{children}
		</ThemeProvider>
	);
};

export const AppearanceProvider: React.FC = ({ children }) => {
	const [store, setStore] = React.useState<AppearanceStore>();

	return (
		<AppearanceContext.Provider value={store || setStore}>
			<FluentThemeProvider>{children}</FluentThemeProvider>
		</AppearanceContext.Provider>
	);
};
