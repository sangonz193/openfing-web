const colors = require("./src/styles/tailwind/colors").default

function colorValueByPaletteName(/** @type {string} */ tailwindName) {
	const color = colors.find((c) => c.tailwindName === tailwindName)

	if (!color) {
		throw new Error(`No color found for ${tailwindName}`)
	}

	const { cssVarName, defaultHsl } = color

	return `hsl(var(${cssVarName}, ${defaultHsl.hue} ${defaultHsl.saturation * 100}% ${
		defaultHsl.lightness * 100
	}%) / <alpha-value>)`
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: colors.reduce((acc, color) => {
				// @ts-ignore
				acc[color.tailwindName] = colorValueByPaletteName(color.tailwindName)
				return acc
			}, {}),
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			typography: () => {
				function getValue(/** @type {string} */ tailwindName) {
					return colorValueByPaletteName(tailwindName).replace("/ <alpha-value>", "")
				}

				return {
					DEFAULT: {
						css: {
							color: getValue("foreground"),
							a: {
								color: getValue("primary"),
							},
						},
					},
				}
			},
		},
	},
	plugins: [
		// @ts-ignore
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
		require("./src/styles/tailwind/plugin"),
	],
}
