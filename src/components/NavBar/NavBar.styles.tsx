import { getMinWidthSelector } from "src/style/getMinWidthSelector";

import { NavBarStyleProps, NavBarStyles } from "./NavBar.types";

export const getStyles = (props: NavBarStyleProps): NavBarStyles => {
	const { theme } = props;

	return {
		root: {
			display: "flex",
			flexShrink: 0,

			borderTop: `1px solid ${theme.semanticColors.bodyDivider}`,
			backgroundColor: theme.semanticColors.bodyStandoutBackground,

			zIndex: 1,

			selectors: {
				[getMinWidthSelector("md")]: {
					flexDirection: "column",

					borderTop: "none",
					borderRight: `1px solid ${theme.semanticColors.bodyDivider}`,
				},
			},
		},

		subComponentStyles: {
			settingsButton: {
				root: {
					selectors: {
						[getMinWidthSelector("md")]: {
							marginTop: "auto",
						},
					},
				},
			},
		},
	};
};
