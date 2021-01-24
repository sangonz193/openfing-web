import { ITheme, loadTheme } from "@fluentui/react/lib/Styling";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { ThemeKey } from "src/style/themes";
import { blackTheme } from "src/style/themes/blackTheme";
import { darkTheme } from "src/style/themes/darkTheme";
import { lightTheme } from "src/style/themes/lightTheme";

import { useReactiveVars } from "../../hooks/useReactiveVars";
import { useBlockInitialization } from "../Initialization";
import { AppearanceContext } from "./Appearance.context";
import { appearanceLocalStorage, migrateAppearanceLocalStorage } from "./Appearance.storage";
import { AppearanceStore } from "./Appearance.store";
import { useAppearanceStore } from "./useAppearanceStore";

export const AppearanceManager: React.FC = () => {
	const unblockInitialization = useBlockInitialization();
	const context = React.useContext(AppearanceContext);

	const [handleAfterLoad, setHandleAfterLoad] = React.useState<(() => void) | undefined>(() => {
		let resolve: () => void = () => {};
		const promise = new Promise<void>((r) => (resolve = r));

		(async () => {
			await migrateAppearanceLocalStorage();

			if (typeof context === "function")
				context(
					new AppearanceStore({
						themeKey: (await appearanceLocalStorage.getItem("theme")) || "light",
					})
				);

			await promise;
			unblockInitialization();
			setHandleAfterLoad(undefined);
		})();

		return () => resolve();
	});

	return typeof context === "function" ? null : <ThemeSync onAfterLoad={handleAfterLoad} />;
};

const ThemeSync = (props: { onAfterLoad?: () => void }) => {
	const { themeKey } = useReactiveVars(useAppearanceStore(), ["themeKey"]);

	const browserDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
	React.useEffect(() => {
		const themeMap: Record<ThemeKey, ITheme> = {
			auto: browserDarkMode ? darkTheme : lightTheme,
			light: lightTheme,
			dark: darkTheme,
			black: blackTheme,
		};

		const theme = themeMap[themeKey];
		document.body.style.backgroundColor = theme.semanticColors.bodyBackground;

		const styleElementId = "@of-custom-styles";
		let customStyleElement = document.getElementById(styleElementId);

		if (!customStyleElement) {
			customStyleElement = document.createElement("style");
			customStyleElement.id = styleElementId;
			document.head.appendChild(customStyleElement);
		}

		const scrollbarTrackColor = theme.palette.neutralLighter;
		const scrollbarThumbColor = theme.palette.neutralQuaternaryAlt;
		customStyleElement.innerHTML =
			`*{scrollbar-width:thin;scrollbar-color:${scrollbarThumbColor}${scrollbarTrackColor};-webkit-overflow-scrolling: auto}\n` +
			`*::-webkit-scrollbar{max-width: 10px}\n` +
			`*::-webkit-scrollbar-track{background:${scrollbarTrackColor}}\n` +
			`*::-webkit-scrollbar-thumb{background-color:${scrollbarThumbColor}}`;

		loadTheme(theme);

		props.onAfterLoad?.();
	}, [themeKey, browserDarkMode]);

	return null;
};
