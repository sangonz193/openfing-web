import { getMinWidthSelector } from "src/style/getMinWidthSelector";

import { LayoutStyleProps, LayoutStyles } from "./Layout.types";

export const getStyles = (props: LayoutStyleProps): LayoutStyles => {
	const { className } = props;

	return {
		root: [
			className,
			{
				display: "flex",
				flexDirection: "column",
				height: "100%",

				overflow: "hidden",

				selectors: {
					[getMinWidthSelector("md")]: {
						flexDirection: "row-reverse",
					},
				},
			},
		],

		contentContainer: {
			display: "flex",
			flexDirection: "column",
			flex: "1 1 auto",
			height: "100%",
		},

		screenContainer: {
			display: "flex",
			flexDirection: "column",
			flex: "1 1 100%",
		},
	};
};
