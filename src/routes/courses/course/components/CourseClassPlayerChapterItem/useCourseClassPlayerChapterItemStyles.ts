import { css, makeStyles } from "@fluentui/react"

export type CourseClassPlayerChapterItemStyleProps = {
	className: string | undefined
	active: boolean
}

const useStyles = makeStyles((theme) => {
	return {
		activeIndicator: {
			width: 8,
			height: 8,
			flexShrink: 0,
			marginLeft: 3,
			marginRight: 7,
			borderRadius: "50%",
		},

		activeIndicatorActive: {
			backgroundColor: theme.palette.accent,
		},

		link: {
			marginBottom: 20,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},

		seconds: {
			fontWeight: "bold",
		},
	}
})

export function useCourseClassPlayerChapterItemStyles({ className, active }: CourseClassPlayerChapterItemStyleProps) {
	const styles = useStyles()

	return {
		link: css(styles.link, className),
		activeIndicator: css(styles.activeIndicator, active && styles.activeIndicatorActive),
		seconds: styles.seconds,
	}
}
