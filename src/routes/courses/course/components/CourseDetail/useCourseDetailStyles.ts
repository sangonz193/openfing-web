import type { IRawStyle } from "@fluentui/react"
import { css, makeStyles } from "@fluentui/react"

import { hiddenScrollStyles } from "../../../../../styles/hiddenScroll.styles"

export type CourseDetailStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	const itemStyle: IRawStyle = {
		margin: "10px auto",
		maxWidth: "100%",
		width: 1280,
		padding: "0 16px",
	}

	return {
		wrapper: {
			display: "flex",
			flexDirection: "column",
			height: "100%",

			background: theme.semanticColors.bodyBackground,

			overflow: "auto",
		},

		container: {
			minHeight: "100%",
			display: "flex",
			flexDirection: "column",
		},

		spinner: {
			margin: "auto",

			"> div": {
				height: 50,
				width: 50,

				borderWidth: 3,
			},
		},

		courseIcon: {
			margin: "auto",
			height: 480,
			width: 480,
			maxHeight: "90%",
			maxWidth: "90%",

			filter: theme.semanticColors.bodyBackground === "#000000" ? "invert(20%)" : undefined,

			img: {
				opacity: 0.5,
			},
		},

		courseIconImage: {
			opacity: 0.5,
		},

		courseClassName: {
			...itemStyle,
			marginTop: 20,
			marginBottom: 0,

			color: theme.semanticColors.bodyText,

			fontWeight: "normal",
		},

		courseClassDate: {
			...itemStyle,
			color: theme.semanticColors.bodyText,
		},

		separator: {
			maxWidth: "100%",
			width: 1280,
			margin: "10px auto",
			padding: 0,
		},

		commandBar: {
			position: "relative",
			padding: "0 20px 5px",
			height: 50,
			...hiddenScrollStyles,
			...itemStyle,

			"button ~ .ms-layer": {
				display: "none",
			},
		},
	}
})

export function useCourseDetailStyles({ className }: CourseDetailStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
		container: styles.container,
		spinner: styles.spinner,
		courseIcon: styles.courseIcon,
		courseIconImage: styles.courseIconImage,
		courseClassName: styles.courseClassName,
		courseClassDate: styles.courseClassDate,
		separator: styles.separator,
		commandBar: styles.commandBar,
	}
}
