import { css, makeStyles } from "@fluentui/react"

import { getMaxWidthSelector } from "../../../../styles/getMaxWidthSelector"
import { getMinWidthSelector } from "../../../../styles/getMinWidthSelector"

export type CoursesStyleProps = {
	className: string | undefined
	showHeaderRight: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			flex: "1 0 100%",
			height: "100%",
			overflow: "auto",
		},

		searchField: {
			flexGrow: 1,
			maxWidth: 500,
			width: "100%",
			marginRight: "auto",
			marginLeft: "auto",

			fontSize: 16,
		},

		searchFieldWithHeaderRight: {
			margin: 0,

			[getMinWidthSelector("sm")]: {
				marginRight: "auto",
				marginLeft: "auto",
			},
		},

		content: {
			display: "flex",
			flexDirection: "column",
			flex: "1 0 auto",
			minHeight: "100%",

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
		},

		searchBoxWrapper: {
			marginTop: 7,
			marginBottom: 7,
			flexDirection: "row",
			flexGrow: 1,
			paddingLeft: 10,
			paddingRight: 10,

			[getMinWidthSelector("md")]: {
				paddingLeft: "initial",
			},
		},

		searchBoxWrapperWithHeaderRight: {
			paddingRight: 0,
		},

		searchBox: {
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

		searchBoxClearButtonIcon: {
			height: "auto",
			fontSize: 20,
		},
	}
})

export function useCoursesStyles({ className, showHeaderRight }: CoursesStyleProps) {
	const styles = useStyles()

	return {
		...styles,
		wrapper: css(styles.wrapper, className),
		searchField: css(styles.searchField, showHeaderRight && styles.searchFieldWithHeaderRight),
		searchBoxWrapper: css(styles.searchBoxWrapper, showHeaderRight && styles.searchBoxWrapperWithHeaderRight),
	}
}
