import { css, makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../../../styles/getMinWidthSelector"

export type CourseStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			position: "relative",
			display: "flex",
			flexDirection: "column",
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
	}
})

export function useCourseStyles(props: CourseStyleProps) {
	const styles = useStyles()

	return {
		...styles,
		wrapper: css(styles.wrapper, props.className),
	}
}
