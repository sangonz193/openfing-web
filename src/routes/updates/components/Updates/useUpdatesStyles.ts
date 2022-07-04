import { css, makeStyles } from "@fluentui/react"

import { getMaxWidthSelector } from "../../../../styles/getMaxWidthSelector"
import { getMinWidthSelector } from "../../../../styles/getMinWidthSelector"

export type UpdatesStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			display: "flex",
			flexGrow: 1,
			flexDirection: "column",

			backgroundColor: theme.semanticColors.bodyBackground,

			overflow: "auto",
			height: "100%",
		},

		content: {
			minHeight: "100%",
			flexShrink: 0,

			[getMinWidthSelector("sm")]: {
				paddingTop: 20,
				paddingBottom: 20,
			},
		},

		spinner: {
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
				margin: 0,
				padding: 0,
				height: 20,
				width: "80%",
				maxWidth: 720,

				":before": {
					backgroundColor: "transparent",
				},
			},

			[getMaxWidthSelector("sm")]: {
				marginTop: 0,
				marginBottom: 0,
				padding: 0,
				height: 1,
			},
		},
	}
})

export function useUpdatesStyles({ className }: UpdatesStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
		content: styles.content,
		spinner: styles.spinner,
		separator: styles.separator,
	}
}
