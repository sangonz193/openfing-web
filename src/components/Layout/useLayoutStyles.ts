import { css, makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../styles/getMinWidthSelector"
import { rootStyles } from "../../styles/rootStyles"

export type LayoutStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			...rootStyles,
			height: "100%",

			"&&": {
				[getMinWidthSelector("md")]: {
					flexDirection: "row-reverse",
				},
			},
		},

		contentAndHeaderContainer: {
			flex: "1 1 auto",
			height: "100%",
		},

		componentContainer: {
			flex: "1 1 100%",
			backgroundColor: theme.semanticColors.bodyBackground,
		},

		navbar: {
			flexShrink: "0 !important",
		},
	}
})

export function useLayoutStyles({ className }: LayoutStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
		contentAndHeaderContainer: styles.contentAndHeaderContainer,
		componentContainer: styles.componentContainer,
		navbar: styles.navbar,
	}
}
