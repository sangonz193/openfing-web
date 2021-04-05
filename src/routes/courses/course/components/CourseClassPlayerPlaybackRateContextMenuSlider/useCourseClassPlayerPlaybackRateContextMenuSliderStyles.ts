import { css, makeStyles } from "@fluentui/react"

export type CourseClassPlayerPlaybackRateContextMenuSliderStyleProps = {
	className: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			padding: 10,
			flexShrink: "0 !important",
		},

		text: {
			margin: "0 auto",
			fontWeight: "bold",
		},

		slider: {
			touchAction: "none",
			flexShrink: 0,
			minWidth: 180,
		},
	}
})

export function useCourseClassPlayerPlaybackRateContextMenuSliderStyles({
	className,
}: CourseClassPlayerPlaybackRateContextMenuSliderStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
		text: styles.text,
		slider: styles.slider,
	}
}
