import { getMaxWidthSelector, getMinWidthSelector } from "src/style";

import { CoursesStyleProps, CoursesStyles } from "./Courses.types";

export const getStyles = (props: CoursesStyleProps): CoursesStyles => {
	const { className } = props;

	return {
		root: [
			className,
			{
				display: "flex",
				flexDirection: "column",
				flex: "1 0 100%",
				height: "100%",
				overflow: "auto",
			},
		],

		searchField: {
			margin: "auto",
			maxWidth: 500,
			width: "90%",

			fontSize: 16,
		},

		content: {
			display: "flex",
			flexDirection: "column",
			flex: "1 0 auto",
			minHeight: "100%",

			selectors: {
				[getMinWidthSelector("sm")]: {
					paddingTop: 20,
					paddingBottom: 20,
				},
			},
		},

		subComponentStyles: {
			spinner: {
				root: {
					marginTop: 10,
				},

				circle: {
					height: 40,
					width: 40,
					borderWidth: 3,
				},
			},

			searchBox: {
				root: {
					margin: "16px auto",

					selectors: {
						[getMinWidthSelector("sm")]: {
							margin: 0,
							padding: 0,
							height: 20,
							width: "80%",
							maxWidth: 720,

							selectors: {
								":before": {
									backgroundColor: "transparent",
								},
							},
						},

						[getMaxWidthSelector("sm")]: {
							marginTop: 0,
							marginBottom: 0,
							padding: 0,
							height: 1,
						},
					},
				},
			},

			searchBoxClearButtonIcon: {
				root: {
					height: "auto",
					fontSize: 20,
				},
			},
		},
	};
};
