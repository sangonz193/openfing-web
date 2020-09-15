import { IRawStyle, IStyle } from "@fluentui/react/lib/Styling";

import { CourseClassPlayerTrackStyleProps, CourseClassPlayerTrackStyles } from "./CourseClassPlayerTrack.types";

export const getStyles = (props: CourseClassPlayerTrackStyleProps): CourseClassPlayerTrackStyles => {
	const { theme } = props;

	const timeStyles: IStyle = [
		{ "font-variant-numeric": "tabular-nums" } as IRawStyle,
		{ padding: "0 10px", color: theme.semanticColors.bodyText },
		theme.fonts.medium,
	];

	return {
		root: {
			display: "flex",
		},

		startTimeWrapper: {
			display: "flex",
			height: 36,
			alignItems: "center",
			justifyContent: "center",
		},

		startTime: timeStyles,

		sliderWrapper: {
			position: "relative",
			display: "flex",
			flex: 1,
		},

		sliderBackgroundTrack: {
			position: "absolute",
			top: "50%",
			left: 0,
			right: 0,
			backgroundColor: theme.semanticColors.menuDivider,
			height: 4,
			marginLeft: 10,
			marginRight: 10,
			transform: "translate(0, -50%)",
		},

		sliderBufferedTrack: {
			position: "absolute",
			left: 0,
			right: 0,
			backgroundColor: theme.semanticColors.inputIconDisabled,
			height: "100%",
			transition: "width ease 0.2s",
		},

		endTimeWrapper: {
			border: "none",
			height: 36,
			padding: 0,
			minWidth: 0,
			backgroundColor: "transparent",
		},

		endTime: timeStyles,

		subComponentStyles: {
			slider: {
				root: {
					flex: 1,

					cursor: "pointer",
					touchAction: "none",
				},

				container: {
					height: "100%",
				},

				line: {
					backgroundColor: "transparent",
				},

				inactiveSection: {
					backgroundColor: "transparent",

					selectors: {
						"*:hover > * > &&&": {
							backgroundColor: "transparent",
						},
						"*:active > * > &&&": {
							backgroundColor: "transparent",
						},
					},
				},
			},

			timeSliderCallout: {
				root: {
					transition: "left 0.1s, right .1s",
				},
			},

			timeSliderCalloutText: {
				root: {
					display: "block",
					padding: "5px 10px",
				},
			},
		},
	};
};
