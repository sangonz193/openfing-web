import { HomeStyleProps, HomeStyles } from "./Home.types";

export const getStyles = (props: HomeStyleProps): HomeStyles => {
	const { className, theme } = props;

	return {
		root: [
			className,
			{
				position: "relative",
				flex: "1 1 100%",
			},
		],

		backgroundContainer: {
			position: "absolute",
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},

		backgroundImage: {
			height: "100%",

			backgroundColor: theme.palette.themeSecondary,
		},

		contentWrapper: {
			height: "100%",

			overflow: "auto",
		},

		topContentContainer: {
			margin: "auto",
			maxWidth: 920,
			width: "80%",
			padding: "20px 0",

			zIndex: 1,
		},

		title: {
			color: "rgb(241, 212, 153)",

			textAlign: "center",
		},

		newItemList: {},

		newItem: {
			display: "list-item",
			margin: "20px 12px 0 32px",

			color: "white",

			listStyle: "disc outside none",

			selectors: {
				"> span": {
					color: "white",
				},
			},
		},

		helpWanted: {
			paddingTop: "32px",

			color: "rgb(241, 212, 153)",

			textAlign: "center",
		},

		suggestions: {
			paddingTop: "32px",

			color: "white",

			textAlign: "center",
			textTransform: "uppercase",
		},

		suggestionsEmail: {
			display: "inline-block",

			color: "white",
		},
	};
};
