import { css, makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../../../styles/getMinWidthSelector"

export type FaqsStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			flex: 1,

			backgroundColor: theme.semanticColors.bodyBackground,

			overflow: "auto",
		},

		content: {
			minHeight: "100%",
			flexShrink: 0,

			[getMinWidthSelector("sm")]: {
				paddingTop: 20,
				paddingBottom: 20,
			},
		},

		spinnerRoot: {
			marginTop: 10,

			"> div": {
				height: 40,
				width: 40,
				borderWidth: 3,
			},
		},

		separator: {
			margin: "16px auto",

			[getMinWidthSelector("sm")]: {
				width: "80%",
				maxWidth: 720,
			},
		},
	}
})

export function useFaqsStyles({ className }: FaqsStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
		content: styles.content,
		spinnerRoot: styles.spinnerRoot,
		separator: styles.separator,
	}
}
