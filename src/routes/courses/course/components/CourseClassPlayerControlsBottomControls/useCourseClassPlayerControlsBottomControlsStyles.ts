import { AnimationStyles, css, makeStyles } from "@fluentui/react"

export type CourseClassPlayerControlsBottomControlsStyleProps = {
	className: string | undefined
	visible: boolean
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			borderRadius: theme.effects.roundedCorner4,
			backgroundColor: theme.semanticColors.bodyStandoutBackground,

			boxShadow: theme.effects.elevation8,
		},

		wrapperVisible: AnimationStyles.slideUpIn10,

		wrapperInvisible: AnimationStyles.fadeOut100,

		buttonsContainer: {
			display: "flex",
		},

		button: {
			border: "none",
			minWidth: 0,
			height: "auto",
			padding: 10,
			fontSize: "1.3rem",
		},

		returnButton: {
			"> span > span": {
				position: "relative",
				top: -6,
				height: 8,
			},
		},
	}
})

export function useCourseClassPlayerControlsBottomControlsStyles({
	className,
	visible,
}: CourseClassPlayerControlsBottomControlsStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className, visible ? styles.wrapperVisible : styles.wrapperInvisible),
		buttonsContainer: styles.buttonsContainer,
		button: styles.button,
		returnButton: styles.returnButton,
	}
}
