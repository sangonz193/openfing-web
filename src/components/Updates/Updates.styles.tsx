import { getMaxWidthSelector, getMinWidthSelector } from "src/style";

import { UpdatesStyleProps, UpdatesStyles } from "./Updates.types";

export const getStyles = (props: UpdatesStyleProps): UpdatesStyles => {
	const { className, theme } = props;

	return {
		root: [
			className,
			{
				display: "flex",
				flexDirection: "column",
				flex: 1,

				backgroundColor: theme.semanticColors.bodyBackground,

				overflow: "auto",
			},
		],

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
		},
	};
};
