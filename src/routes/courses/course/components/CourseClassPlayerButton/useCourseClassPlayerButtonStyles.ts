import { css, makeStyles } from "@fluentui/react"

export type CourseClassPlayerButtonStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			border: "none",
			minWidth: 0,
			height: "auto",
			minHeight: 40,
			paddingTop: 5,
			paddingRight: 10,
			paddingBottom: 5,
			paddingLeft: 10,

			backgroundColor: theme.semanticColors.bodyStandoutBackground,

			span: {
				flexDirection: "column",
			},
		},

		icon: {
			fontSize: "1.3rem",
		},

		text: {
			...theme.fonts.tiny,
		},
	}
})

export function useCourseClassPlayerButtonStyles({ className }: CourseClassPlayerButtonStyleProps) {
	const styles = useStyles()

	return {
		...styles,
		wrapper: css(styles.wrapper, className),
	}
}
