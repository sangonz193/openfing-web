import { HomeStyleProps, HomeStyles } from "./Home.types";

export const getStyles = (props: HomeStyleProps): HomeStyles => {
	const { className, theme } = props;

	return {
		root: [
			className,
			{
				position: "relative",
				flex: "1 1 100%",

				overflow: "auto",
			},
		],

		contentWrapper: {
			width: 720,
			maxWidth: "90%",
			alignSelf: "center",
		},

		itemWrapper: {
			display: "flex",
			flexDirection: "column",
			marginTop: 30,

			borderWidth: 1,
			borderColor: theme.semanticColors.bodyDivider,
			borderStyle: "solid",
			backgroundColor: theme.semanticColors.bodyStandoutBackground,
			borderRadius: theme.effects.roundedCorner4,
			overflow: "hidden",
		},

		itemSeparator: {
			height: 1,
			// backgroundColor: theme.semanticColors.bodyDivider,
			marginTop: 30,
			marginLeft: "auto",
			marginRight: "auto",
			width: "50%",
		},

		itemImage: {
			height: 350,
			backgroundImage:
				'url("https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wpol?ver=f329")',
			backgroundSize: "cover",
		},

		subComponentStyles: {
			itemTitle: {
				root: {
					margin: "10px 0px 0px 0",
					paddingLeft: 20,
					paddingRight: 20,
				},
			},

			itemContent: {
				root: {
					marginTop: 0,
					paddingLeft: 20,
					paddingBottom: 20,
					paddingRight: 20,
				},
			},
		},
	};
};
