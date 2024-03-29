import { createTheme } from "@fluentui/react/lib/Styling"

import palette from "./blackThemePalette"
import { defaultFontStyles } from "./defaultFontStyles"

export const blackTheme = createTheme({
	defaultFontStyle: {
		fontFamily: "Roboto",
		color: palette.black,
		fontSize: "16px",
	},
	palette,
	isInverted: true,
	fonts: defaultFontStyles,
})
