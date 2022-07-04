import { css, makeStyles } from "@fluentui/react"

import { hiddenScrollStyles } from "../../styles/hiddenScroll.styles"

export type HeaderStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			height: 50,
			flexShrink: 0,

			borderBottom: `1px solid ${theme.semanticColors.bodyDivider}`,
			backgroundColor: theme.palette.neutralLighterAlt,

			zIndex: 1,
		},

		titleWrapper: {
			flex: 1,
			...hiddenScrollStyles,
		},

		title: [
			theme.fonts.xLarge,
			{
				marginRight: "auto",
				alignSelf: "center",
				padding: "0 20px",
				whiteSpace: "nowrap",
				display: "block",
				textOverflow: "ellipsis",

				color: theme.semanticColors.bodyText,
			},
		],
	}
})

export function useHeaderStyles({ className }: HeaderStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
		titleWrapper: styles.titleWrapper,
		title: styles.title,
	}
}
