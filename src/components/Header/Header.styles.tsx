import { HeaderStyleProps, HeaderStyles } from "./Header.types";

export const getStyles = (props: HeaderStyleProps): HeaderStyles => {
	const { theme } = props;

	return {
		root: {
			display: "flex",
			height: 50,
			flexShrink: 0,

			borderBottom: `1px solid ${theme.semanticColors.bodyDivider}`,
			backgroundColor: theme.palette.neutralLighterAlt,

			zIndex: 1,
		},

		title: [
			theme.fonts.xLarge,
			{
				marginRight: "auto",
				alignSelf: "center",
				padding: "0 20px",
				whiteSpace: "nowrap",
				display: "block",
				overflow: "hidden",
				textOverflow: "ellipsis",

				color: theme.semanticColors.bodyText,
			},
		],
	};
};
