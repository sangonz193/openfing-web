import type { IRawStyle, IStyle } from "@fluentui/react"
import { css, makeStyles } from "@fluentui/react"

export type CourseClassPlayerTrackStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	const timeStyles: IStyle = [
		{ "font-variant-numeric": "tabular-nums" } as IRawStyle,
		{ padding: "0 10px", color: theme.semanticColors.bodyText },
		theme.fonts.medium,
	]

	return {
		wrapper: {
			flexDirection: "row",
			alignItems: "center",
		},

		startTimeWrapper: {
			display: "flex",
			height: 36,
			alignItems: "center",
			justifyContent: "center",
		},

		startTime: timeStyles,

		endTimeWrapper: {
			border: "none",
			height: 36,
			padding: 0,
			minWidth: 0,
			backgroundColor: "transparent",
		},

		endTime: timeStyles,
	}
})

export function useCourseClassPlayerTrackStyles({ className }: CourseClassPlayerTrackStyleProps) {
	const styles = useStyles()

	return {
		...styles,
		wrapper: css(styles.wrapper, className),
	}
}
