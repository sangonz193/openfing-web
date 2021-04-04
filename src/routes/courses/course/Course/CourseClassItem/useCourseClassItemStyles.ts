import { css, makeStyles } from "@fluentui/react"

export type CourseClassItemStyleProps = {
	className: string | undefined
	active: boolean
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			display: "block",
			padding: "16px 0",

			color: theme.semanticColors.buttonText,

			"&:hover, &:hover, &:hover:active": {
				backgroundColor: theme.semanticColors.buttonBackgroundHovered,
				color: theme.semanticColors.buttonTextHovered,

				textDecoration: "none",
			},

			":focus": {
				color: theme.semanticColors.buttonTextHovered,
			},
		},

		wrapperActive: {
			backgroundColor: theme.semanticColors.accentButtonBackground,
			color: theme.semanticColors.accentButtonText,

			"&:hover, &:hover, &:hover:active": {
				backgroundColor: theme.semanticColors.primaryButtonBackgroundHovered,
				color: theme.semanticColors.primaryButtonTextHovered,

				textDecoration: "none",
			},

			":focus": {
				color: theme.semanticColors.primaryButtonTextHovered,
			},
		},

		content: {
			flexDirection: "row",
			height: "100%",
			alignItems: "center",
		},

		courseClassNumber: {
			width: 40,
			flexShrink: 0,

			textAlign: "center",
			fontWeight: "bold",
		},

		courseClassNumberActive: {
			color: theme.semanticColors.accentButtonText,
		},

		courseClassName: {
			...theme.fonts.mediumPlus,
			paddingRight: 10,
		},

		courseClassNameActive: {
			color: theme.semanticColors.accentButtonText,
		},
	}
})

export function useCourseClassItemStyles({ className, active }: CourseClassItemStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className, active && styles.wrapperActive),
		content: styles.content,
		courseClassNumber: css(styles.courseClassNumber, active && styles.courseClassNumberActive),
		courseClassName: css(styles.courseClassName, active && styles.courseClassNameActive),
	}
}
