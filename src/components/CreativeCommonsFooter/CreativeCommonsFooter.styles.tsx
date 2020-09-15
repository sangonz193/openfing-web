import { getMinWidthSelector } from "src/style/getMinWidthSelector";

import { CreativeCommonsFooterStyleProps, CreativeCommonsFooterStyles } from "./CreativeCommonsFooter.types";

export const getStyles = (props: CreativeCommonsFooterStyleProps): CreativeCommonsFooterStyles => {
	const { theme } = props;

	return {
		root: {
			display: "flex",
			flexDirection: "column",
			flexShrink: 0,
			padding: 10,
			marginTop: 10,
			width: "100%",

			borderTopColor: theme.semanticColors.bodyDivider,
			borderTopWidth: 1,
			borderTopStyle: "solid",

			selectors: {
				[getMinWidthSelector("md")]: {
					flexDirection: "row",
					alignItems: "center",
				},
			},
		},

		imageContainer: {
			marginBottom: 10,

			selectors: {
				[getMinWidthSelector("md")]: {
					marginBottom: 0,
					marginRight: 10,
				},
			},
		},

		image: {
			selectors: {
				"> img": {
					height: 40,
				},
			},
		},

		text: {},

		link: {
			color: theme.semanticColors.link,
		},
	};
};
