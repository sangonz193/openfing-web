import type { Parameters } from "@storybook/react"

export const parameters: Parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		include: [],
		hideNoControlsWarning: true,
	},
}
