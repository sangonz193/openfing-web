import { CourseClassPlayerButtonStyleProps, CourseClassPlayerButtonStyles } from "./CourseClassPlayerButton.types";

export const getStyles = (props: CourseClassPlayerButtonStyleProps): CourseClassPlayerButtonStyles => {
	const { theme } = props;

	return {
		icon: {
			fontSize: "1.3rem",
		},

		subComponentStyles: {
			root: {
				root: {
					border: "none",
					minWidth: 0,
					height: "auto",
					minHeight: 40,
					paddingTop: 5,
					paddingRight: 10,
					paddingBottom: 5,
					paddingLeft: 10,

					backgroundColor: theme.semanticColors.bodyStandoutBackground,
				},

				flexContainer: {
					flexDirection: "column",
				},
			},

			text: {
				root: {
					...theme.fonts.tiny,
				},
			},
		},
	};
};
