import { createTheme } from "@fluentui/react/lib/Styling"

import { defaultFontStyles } from "./defaultFontStyles"
import palette from "./lightThemePalette"

export const lightTheme = createTheme({
	defaultFontStyle: {
		fontFamily: "Roboto",
		color: palette.black,
		fontSize: "16px",
	},
	palette,
	fonts: defaultFontStyles,
})
