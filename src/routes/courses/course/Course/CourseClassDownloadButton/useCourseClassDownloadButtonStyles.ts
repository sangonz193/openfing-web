import { css, makeStyles } from "@fluentui/react"

export type CourseClassDownloadButtonStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		commandButton: {
			fontSize: theme.fonts.mediumPlus.fontSize,

			i: {
				height: "auto",

				fontSize: theme.fonts.xLarge.fontSize,
			},
		},
	}
})

export function useCourseClassDownloadButtonStyles({ className }: CourseClassDownloadButtonStyleProps) {
	const styles = useStyles()

	return {
		commandButton: css(styles.commandButton, className),
	}
}
