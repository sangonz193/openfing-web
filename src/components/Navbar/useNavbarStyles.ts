import { css, makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../styles/getMinWidthSelector"

export type NavbarStyleProps = {}

const useStyles = makeStyles((theme) => {
	return {
		focusZone: {
			display: "flex",
			flexShrink: 0,
			flexDirection: "row",

			borderTop: `1px solid ${theme.semanticColors.bodyDivider}`,

			backgroundColor: theme.palette.neutralLighterAlt,

			[getMinWidthSelector("md")]: {
				flexDirection: "column",

				borderTop: "none",
				borderRight: `1px solid ${theme.semanticColors.bodyDivider}`,
			},
		},

		navbarButton: {
			fontSize: "1.3rem",
			color: theme.semanticColors.bodyText,
		},

		iconSettings: {
			marginTop: "auto",
		},
	}
})

export function useNavbarStyles({}: NavbarStyleProps = {}) {
	const styles = useStyles()

	return {
		focusZone: styles.focusZone,
		navbarButton: styles.navbarButton,
		settings: css(styles.navbarButton, styles.iconSettings),
	}
}
