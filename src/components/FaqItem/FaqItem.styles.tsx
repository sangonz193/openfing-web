import { FaqItemStyleProps, FaqItemStyles } from "./FaqItem.types";

export const getStyles = (props: FaqItemStyleProps): FaqItemStyles => {
	const { theme } = props;

	return {
		root: [
			props.className,
			{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				margin: "0 auto",
				padding: 20,
				maxWidth: 720,
			},
		],

		title: {
			color: theme.semanticColors.bodyText,

			textAlign: "center",
		},

		content: {
			color: theme.semanticColors.bodyText,

			textAlign: "center",

			selectors: {
				"> a": {
					color: theme.semanticColors.link,

					selectors: {
						":hover": {
							color: theme.semanticColors.linkHovered,
						},
					},
				},
			},
		},
	};
};
