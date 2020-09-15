import {
	CourseClassDownloadButtonStyleProps,
	CourseClassDownloadButtonStyles,
} from "./CourseClassDownloadButton.types";

export const getStyles = (props: CourseClassDownloadButtonStyleProps): CourseClassDownloadButtonStyles => {
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
