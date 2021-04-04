import { makeStyles } from "@fluentui/react"

export type CourseClassPlayerVolumeButtonStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		sliderWrapper: {
			height: 180,

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
		},
	}
})

export function useCourseClassPlayerVolumeButtonStyles({}: CourseClassPlayerVolumeButtonStyleProps) {
	const styles = useStyles()

	return {
		...styles,
	}
}
