import { css, makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../styles/getMinWidthSelector"

export type NavbarButtonStyleProps = {
	className: string | undefined
	active: boolean
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			position: "relative",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexGrow: 1,
			flexShrink: 0,
			height: 50,
			minWidth: 50,

			":hover": {
				backgroundColor: theme.palette.neutralLight,
			},

			[getMinWidthSelector("md")]: {
				width: 50,
				flexGrow: 0,
			},
		},

		icon: {
			color: theme.semanticColors.bodyText,

			fontSize: "1.3rem",
		},

		iconActive: {
			color: theme.palette.accent,
		},

		activeIndicator: {
			position: "absolute",
			width: 5,
			height: 5,
			top: 5,

			borderRadius: theme.effects.roundedCorner2,
			backgroundColor: theme.palette.accent,

			[getMinWidthSelector("md")]: {
				left: 5,
				top: "auto",
			},
		},
	}
})

export function useNavbarButtonStyles({ className, active }: NavbarButtonStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
		icon: css(styles.icon, active && styles.iconActive),
		activeIndicator: styles.activeIndicator,
	}
}
