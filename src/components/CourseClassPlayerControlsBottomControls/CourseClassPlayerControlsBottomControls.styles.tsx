import { AnimationStyles } from "@fluentui/react/lib/Styling";

import {
	CourseClassPlayerControlsBottomControlsStyleProps,
	CourseClassPlayerControlsBottomControlsStyles,
} from "./CourseClassPlayerControlsBottomControls.types";

export const getStyles = (
	props: CourseClassPlayerControlsBottomControlsStyleProps
): CourseClassPlayerControlsBottomControlsStyles => {
	return {
		root: [
			{
				borderRadius: props.theme.effects.roundedCorner2,
				backgroundColor: props.theme.semanticColors.bodyStandoutBackground,

				boxShadow: props.theme.effects.elevation8,
			},
			props.visible ? AnimationStyles.slideUpIn10 : AnimationStyles.fadeOut100,
		],

		buttonsContainer: {
			display: "flex",
		},

		subComponentStyles: {
			button: {
				root: {
					border: "none",
					minWidth: 0,
					height: "auto",
					padding: 10,
					fontSize: "1.3rem",
				},
			},

			returnButton: {
				subComponentStyles: {
					text: {
						root: {
							position: "relative",
							top: -6,
							height: 8,
						},
					},
				},
			},
		},
	};
};
