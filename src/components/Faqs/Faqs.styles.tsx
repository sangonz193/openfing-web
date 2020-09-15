import { getMinWidthSelector } from "src/style/getMinWidthSelector";

import { FaqsStyleProps, FaqsStyles } from "./Faqs.types";

export const getStyles = (props: FaqsStyleProps): FaqsStyles => {
	const { theme } = props;

	return {
		root: {
			display: "flex",
			flexDirection: "column",
			flex: 1,

			backgroundColor: theme.semanticColors.bodyBackground,

			overflow: "auto",
		},

		content: {
			minHeight: "100%",
			flexShrink: 0,

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

			separator: {
				root: {
					margin: "16px auto",

					selectors: {
						[getMinWidthSelector("sm")]: {
							width: "80%",
							maxWidth: 720,
						},
					},
				},
			},
		},
	};
};
