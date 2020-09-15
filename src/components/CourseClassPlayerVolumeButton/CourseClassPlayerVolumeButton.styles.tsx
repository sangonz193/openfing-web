import {
	CourseClassPlayerVolumeButtonStyleProps,
	CourseClassPlayerVolumeButtonStyles,
} from "./CourseClassPlayerVolumeButton.types";

export const getStyles = (props: CourseClassPlayerVolumeButtonStyleProps): CourseClassPlayerVolumeButtonStyles => {
	const { theme } = props;

	return {
		sliderWrapper: {
			height: 180,

			backgroundColor: theme.semanticColors.bodyStandoutBackground,

			touchAction: "none",
		},

		subComponentStyles: {
			hoverCard: {
				host: {
					display: "flex",
				},
			},

			slider: {
				root: {
					display: "flex",
					flexDirection: "column",
					marginRight: 5,
					marginLeft: 5,
				},
			},
		},
	};
};
