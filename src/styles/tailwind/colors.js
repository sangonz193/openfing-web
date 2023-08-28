const { parseToHsl } = require("polished")
const lightThemePalette = require("../themes/lightThemePalette").default
const blackThemePalette = require("../themes/blackThemePalette").default
const darkThemePalette = require("../themes/darkThemePalette").default

const defaultTheme = lightThemePalette

/**
 * @typedef {{
 * defaultHsl: import("polished/lib/types/color").HslColor
 * cssVarName: string
 * tailwindName: string
 * darkThemeHsl: import("polished/lib/types/color").HslColor
 * lightThemeHsl: import("polished/lib/types/color").HslColor
 * blackThemeHsl: import("polished/lib/types/color").HslColor
 * }} Color
 */

/**
 * @typedef {{
 * "--background": string,
 * "--foreground": string,
 * "--card": string,
 * "--card-foreground": string,
 * "--popover": string,
 * "--popover-foreground": string,
 * "--primary": string,
 * "--primary-foreground": string,
 * "--secondary": string,
 * "--secondary-foreground": string,
 * "--muted": string,
 * "--muted-foreground": string,
 * "--accent": string,
 * "--accent-foreground": string,
 * "--destructive": string
 * "--destructive-foreground": string,
 * "--border": string,
 * "--input": string,
 * "--ring": string,
 * "--radius": string,
 * }} ShadcnCssVars
 */

/** @type {{cssVarName: keyof ShadcnCssVars, fluentThemeKey: keyof typeof defaultTheme}[]} */
const colors = [
	{
		cssVarName: "--background",
		fluentThemeKey: "white",
	},
	{
		cssVarName: "--foreground",
		fluentThemeKey: "black",
	},
	{
		cssVarName: "--card",
		fluentThemeKey: "neutralLighter",
	},
	{
		cssVarName: "--card-foreground",
		fluentThemeKey: "neutralPrimary",
	},
	{
		cssVarName: "--popover",
		fluentThemeKey: "neutralLighter",
	},
	{
		cssVarName: "--popover-foreground",
		fluentThemeKey: "neutralPrimary",
	},
	{
		cssVarName: "--primary",
		fluentThemeKey: "themePrimary",
	},
	{
		cssVarName: "--primary-foreground",
		fluentThemeKey: "white",
	},
	{
		cssVarName: "--secondary",
		fluentThemeKey: "themeSecondary",
	},
	{
		cssVarName: "--secondary-foreground",
		fluentThemeKey: "white",
	},
	{
		cssVarName: "--muted",
		fluentThemeKey: "neutralLight",
	},
	{
		cssVarName: "--muted-foreground",
		fluentThemeKey: "neutralPrimary",
	},
	{
		cssVarName: "--accent",
		fluentThemeKey: "themeLight",
	},
	{
		cssVarName: "--accent-foreground",
		fluentThemeKey: "white",
	},
	{
		cssVarName: "--destructive",
		fluentThemeKey: "themeDark",
	},
	{
		cssVarName: "--destructive-foreground",
		fluentThemeKey: "white",
	},
	{
		cssVarName: "--border",
		fluentThemeKey: "neutralQuaternaryAlt",
	},
	{
		cssVarName: "--input",
		fluentThemeKey: "neutralLighter",
	},
	{
		cssVarName: "--ring",
		fluentThemeKey: "themePrimary",
	},
]

export default colors.map(({ cssVarName, fluentThemeKey }) => {
	return /** @type {const} @satisfies {Color} */ ({
		cssVarName: cssVarName,
		tailwindName: cssVarName.replace("--", ""),
		defaultHsl: parseToHsl(defaultTheme[fluentThemeKey]),
		blackThemeHsl: parseToHsl(blackThemePalette[fluentThemeKey]),
		darkThemeHsl: parseToHsl(darkThemePalette[fluentThemeKey]),
		lightThemeHsl: parseToHsl(lightThemePalette[fluentThemeKey]),
	})
})
