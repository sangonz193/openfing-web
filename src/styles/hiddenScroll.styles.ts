import type { IRawStyle } from "@fluentui/merge-styles"

export const hiddenScrollStyles: IRawStyle = {
	overflow: "auto",

	"-ms-overflow-style": "none",
	scrollbarWidth: "none",

	"&::-webkit-scrollbar": {
		display: "none",
	},
}
