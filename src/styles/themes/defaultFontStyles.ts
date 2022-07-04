import type { IFontStyles } from "@fluentui/style-utilities"
import { DefaultFontStyles } from "@fluentui/style-utilities"

export const defaultFontStyles: Partial<IFontStyles> = {
	small: {
		...DefaultFontStyles.small,
		fontSize: 14,
		fontFamily: "Roboto",
	},
	smallPlus: {
		...DefaultFontStyles.smallPlus,
		fontSize: 14,
		fontFamily: "Roboto",
	},
	medium: {
		// ...DefaultFontStyles.mediumPlus,
		fontFamily: "Roboto",
	},
}

// const keys: Array<keyof typeof DefaultFontStyles> = [
// 	"tiny",
// 	"xSmall",
// 	"smallPlus",
// 	"medium",
// 	"mediumPlus",
// 	"large",
// 	"xLarge",
// 	"xLargePlus",
// 	"xxLarge",
// 	"xxLargePlus",
// 	"superLarge",
// 	"mega",
// ]

// keys.forEach((key, index) => {
// 	const defaultFontStyle = DefaultFontStyles[key]
// 	const nextIndex = index + 1

// 	defaultFontStyle.fontSize = defaultFontStyle.fontSize ?? 0

// 	defaultFontStyles[key] = {
// 		...defaultFontStyle,
// 		fontFamily: "Roboto",
// 		fontSize:
// 			nextIndex >= keys.length
// 				? (defaultFontStyle.fontSize as number) +
// 				  ((defaultFontStyle.fontSize as number) - (DefaultFontStyles[keys[index - 1]].fontSize as number))
// 				: (DefaultFontStyles[keys[index + 1]].fontSize as number),
// 	}

// 	// defaultFontStyle.
// })
