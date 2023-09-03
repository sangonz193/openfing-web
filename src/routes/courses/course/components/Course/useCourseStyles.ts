import { makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../../../../styles/getMinWidthSelector"

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			position: "relative",
			height: "100%",

			[getMinWidthSelector("sm")]: {
				flexDirection: "row",
			},
		},

		headerLink: {
			display: "flex",
			alignItems: "center",
			padding: "0 20px",
		},

		courseMaster: {
			height: "100%",

			[getMinWidthSelector("sm")]: {
				width: 350,
				flexShrink: 0,
				borderRight: `1px solid ${theme.semanticColors.bodyFrameDivider}`,
			},
		},

		courseDetails: {
			position: "absolute",
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,

			[getMinWidthSelector("sm")]: {
				position: "static",
				flex: "1 1 auto",
			},
		},

		commandBar: {
			height: "100%",
			"> div": {
				height: "100%",
				"> div": {
					height: "100%",
					".ms-FocusZone": {
						backgroundColor: "transparent",
						height: "100%",
						paddingRight: 0,
						paddingLeft: 0,
					},
				},
			},

			button: {
				width: 49,

				backgroundColor: "transparent",
			},
		},

		commandBarOverflowItemButton: {
			backgroundColor: theme.palette.neutralLighterAlt,

			".ms-ContextualMenu-link": {
				fontSize: 16,
				height: 40,
			},
		},
	}
})

export function useCourseStyles() {
	const styles = useStyles()

	return {
		...styles,
		wrapper: styles.wrapper,
	}
}
