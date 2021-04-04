import { ITheme } from "@fluentui/style-utilities"

import { ThemeKey } from "../../style/themes"
import { blackTheme } from "../../style/themes/blackTheme"
import { darkTheme } from "../../style/themes/darkTheme"
import { lightTheme } from "../../style/themes/lightTheme"

export function getThemeFromKey(themeKey: ThemeKey, options: { prefersDarkMode?: boolean }): ITheme {
	const { prefersDarkMode = false } = options
	const themeMap: Record<ThemeKey, ITheme> = {
		auto: prefersDarkMode ? darkTheme : lightTheme,
		light: lightTheme,
		dark: darkTheme,
		black: blackTheme,
	}

	return themeMap[themeKey]
}
