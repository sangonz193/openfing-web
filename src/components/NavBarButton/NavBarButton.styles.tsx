import { getMinWidthSelector } from "src/style/getMinWidthSelector";

import { NavBarButtonStyleProps, NavBarButtonStyles } from "./NavBarButton.types";

export const getStyles = (props: NavBarButtonStyleProps): NavBarButtonStyles => {
	const { theme } = props;

	return {
		root: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexGrow: 1,
			height: 50,

			selectors: {
				":hover": {
					backgroundColor: theme.palette.neutralLight,
				},

				[getMinWidthSelector("md")]: {
					width: 50,
					flexGrow: 0,
				},
			},
		},

		iconWrapper: {
			position: "relative",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},

		activeIndicator: {
			position: "absolute",
			bottom: -9,
			left: "50%",
			width: 5,
			height: 5,

			borderRadius: theme.effects.roundedCorner2,
			backgroundColor: theme.palette.accent,

			transform: "translateX(-50%)",

			selectors: {
				[getMinWidthSelector("md")]: {
					top: "50%",
					bottom: "initial",
					left: -9,

					transform: "translateY(-50%)",
				},
			},
		},

		icon: [
			{
				fontSize: "1.3rem",
				color: theme.semanticColors.bodyText,
			},
			props.isActive && {
				color: theme.palette.accent,
			},
		],
	};
};
