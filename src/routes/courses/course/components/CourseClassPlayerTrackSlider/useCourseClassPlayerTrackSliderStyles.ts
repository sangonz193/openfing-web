import { css, makeStyles } from "@fluentui/react"

export type CourseClassPlayerTrackSliderStyleProps = {
	className: string | undefined
	sliderDisabled: boolean
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			position: "relative",
			flex: 1,
			flexDirection: "row",
		},

		timeSliderCallout: {
			transition: "left 0.1s, right .1s",
		},

		timeSliderCalloutText: {
			display: "block",
			padding: "5px 10px",
		},

		sliderBackgroundTrack: {
			position: "absolute",
			top: "50%",
			left: 0,
			right: 0,
			height: 4,
			marginLeft: 10,
			marginRight: 10,

			backgroundColor: theme.semanticColors.menuDivider,

			transform: "translate(0, -50%)",
		},

		sliderBufferedTrack: {
			position: "absolute",
			left: 0,
			right: 0,
			height: "100%",

			backgroundColor: theme.semanticColors.inputIconDisabled,

			transition: "width ease 0.2s",
		},

		slider: {
			flex: 1,

			cursor: "pointer",
			touchAction: "none",
		},

		sliderDisabled: {
			cursor: "initial",
		},
	}
})

export function useCourseClassPlayerTrackSliderStyles({
	className,
	sliderDisabled,
}: CourseClassPlayerTrackSliderStyleProps) {
	const styles = useStyles()

	return {
		slider: css(styles.slider, sliderDisabled && styles.sliderDisabled),
		sliderBackgroundTrack: styles.sliderBackgroundTrack,
		sliderBufferedTrack: styles.sliderBufferedTrack,
		timeSliderCallout: styles.timeSliderCallout,
		timeSliderCalloutText: styles.timeSliderCalloutText,
		wrapper: css(styles.wrapper, className),
	}
}
