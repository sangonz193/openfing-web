import { CourseClassShareButtonStyleProps, CourseClassShareButtonStyles } from "./CourseClassShareButton.types";

export const getStyles = (props: CourseClassShareButtonStyleProps): CourseClassShareButtonStyles => {
	const { theme } = props;

	return {
		subComponentStyles: {
			commandButton: {
				root: {
					fontSize: theme.fonts.mediumPlus.fontSize,
				},

				icon: {
					height: "auto",

					fontSize: theme.fonts.xLarge.fontSize,
				},
			},
		},
	};
};
