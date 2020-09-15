import { getMinWidthSelector } from "src/style/getMinWidthSelector";

import { CourseStyleProps, CourseStyles } from "./Course.types";

export const getStyles = (props: CourseStyleProps): CourseStyles => {
	const { className, theme } = props;

	return {
		root: [
			className,
			{
				position: "relative",
				display: "flex",
				flexDirection: "column",
				height: "100%",

				selectors: {
					[getMinWidthSelector("sm")]: {
						flexDirection: "row",
					},
				},
			},
		],

		subComponentStyles: {
			headerLink: {
				root: {
					display: "flex",
					alignItems: "center",
					padding: "0 20px",
				},
			},

			courseMaster: {
				root: {
					height: "100%",

					selectors: {
						[getMinWidthSelector("sm")]: {
							width: 350,
							flexShrink: 0,
							borderRight: `1px solid ${theme.semanticColors.bodyFrameDivider}`,
						},
					},
				},
			},

			courseDetails: {
				root: {
					position: "absolute",
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,

					selectors: {
						[getMinWidthSelector("sm")]: {
							position: "static",
							flex: "1 1 auto",
						},
					},
				},
			},
		},
	};
};
