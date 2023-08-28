const { default: colors } = require("./colors")

module.exports = require("tailwindcss/plugin")(({ addBase }) => {
	/** @type {Record<"dark" | "light" | "black", "darkThemeHsl" | "lightThemeHsl" | "blackThemeHsl">} */
	const palettes = {
		dark: "darkThemeHsl",
		light: "lightThemeHsl",
		black: "blackThemeHsl",
	}

	const getVarsForPalette = (/** @type {keyof typeof palettes} */ paletteName) => {
		return colors.reduce((acc, color) => {
			const hsl = color[palettes[paletteName]]

			// @ts-ignore
			acc[color.cssVarName] =
				//
				`${hsl.hue} ${hsl.saturation * 100}% ${hsl.lightness * 100}%`

			return acc
		}, {})
	}

	addBase({
		".dark": {
			...getVarsForPalette("dark"),
			"--radius": "0.375rem",
		},
		".light": {
			...getVarsForPalette("light"),
			"--radius": "0.375rem",
		},
		".black": {
			...getVarsForPalette("black"),
			"--radius": "0.375rem",
		},
	})
})
