import { makeStyles } from "@fluentui/react"

export type CourseClassPlayerVolumeButtonStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		sliderWrapper: {
			height: 180,
			flexShrink: 1,

			backgroundColor: theme.semanticColors.bodyStandoutBackground,

			touchAction: "none",
		},

		hoverCard: {
			host: {
				display: "flex",
			},
		},

		slider: {
			display: "flex",
			flexDirection: "column",
			marginRight: 5,
			marginLeft: 5,

			".ms-Slider-container": {
				flexShrink: 1,

				".ms-Slider-slideBox": {
					flexShrink: 1,
				},

				".ms-Label": {
					flexShrink: 1,
				},
			},
		},
	}
})

export function useCourseClassPlayerVolumeButtonStyles({}: CourseClassPlayerVolumeButtonStyleProps) {
	const styles = useStyles()

	return {
		...styles,
	}
}
