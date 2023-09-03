import { createTheme } from "@fluentui/react/lib/Styling"

import palette from "./darkThemePalette"
import { defaultFontStyles } from "./defaultFontStyles"

export const darkTheme = createTheme({
	defaultFontStyle: {
		fontFamily: "Roboto",
		color: palette.black,
		fontSize: "16px",
	},
	palette,
	isInverted: true,
	fonts: defaultFontStyles,
})
