import { css, makeStyles } from "@fluentui/react"

import { getMaxWidthSelector } from "../../../../styles/getMaxWidthSelector"
import { getMinWidthSelector } from "../../../../styles/getMinWidthSelector"

export type CoursesStyleProps = {
	className: string | undefined
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
			margin: "auto",
			maxWidth: 500,
			width: "90%",

			fontSize: 16,
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

		searchBox: {
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

		searchBoxClearButtonIcon: {
			height: "auto",
			fontSize: 20,
		},
	}
})

export function useCoursesStyles({ className }: CoursesStyleProps) {
	const styles = useStyles()

	return {
		...styles,
		wrapper: css(styles.wrapper, className),
	}
}
