import { css, makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../styles/getMinWidthSelector"

export type NavbarStyleProps = {
	className?: string
	disabledRetryRefreshToken: boolean
}

const useStyles = makeStyles((theme) => {
	const button = {
		height: 50,
		flexGrow: 1,

		[getMinWidthSelector("md")]: {
			flexGrow: 0,
		},

		".ms-Button-icon": {
			fontSize: "1.3rem",
			height: "auto",
			color: theme.semanticColors.bodyText,
		},

		"&:hover, &:active:hover": {
			".ms-Button-icon": {
				fontSize: "1.3rem",
				height: "auto",
				color: theme.semanticColors.bodyText,
			},
		},
	}

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

				overflow: "auto",
			},
		},

		logout: button,

		retryRefreshToken: [
			button,
			{
				".ms-Button-icon": {
					color: theme.semanticColors.errorIcon,
				},

				"&:hover, &:active:hover": {
					".ms-Button-icon": {
						color: theme.semanticColors.errorIcon,
					},
				},
				color: theme.semanticColors.errorIcon,
			},
		],

		disabledRetryRefreshToken: {
			".ms-Button-icon": {
				color: theme.semanticColors.disabledBodyText,
			},

			"&:hover, &:active:hover": {
				".ms-Button-icon": {
					color: theme.semanticColors.disabledBodyText,
				},
			},
		},
	}
})

export function useNavbarStyles({ className, disabledRetryRefreshToken }: NavbarStyleProps) {
	const styles = useStyles()

	return {
		focusZone: css(styles.focusZone, className),
		logout: styles.logout,
		retryRefreshToken: css(styles.retryRefreshToken, disabledRetryRefreshToken && styles.disabledRetryRefreshToken),
	}
}
