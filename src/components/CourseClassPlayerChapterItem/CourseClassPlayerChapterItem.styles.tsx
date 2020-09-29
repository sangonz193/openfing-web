import {
	CourseClassPlayerChapterItemStyleProps,
	CourseClassPlayerChapterItemStyles,
} from "./CourseClassPlayerChapterItem.types";

export const getStyles = (props: CourseClassPlayerChapterItemStyleProps): CourseClassPlayerChapterItemStyles => {
	const { isActive, className, theme } = props;

	return {
		activeIndicator: {
			width: 8,
			height: 8,
			backgroundColor: isActive ? theme.palette.accent : undefined,
			flexShrink: 0,
			marginLeft: 3,
			marginRight: 7,
			borderRadius: "50%",
		},

		subComponentStyles: {
			link: {
				root: [
					{
						marginBottom: 20,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					},
					className,
				],
			},

			seconds: {
				root: {
					fontWeight: "bold",
				},
			},
		},
	};
};
