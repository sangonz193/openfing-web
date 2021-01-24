import { getMinWidthSelector } from "src/style/getMinWidthSelector";

import { UpdateItemStyleProps, UpdateItemStyles } from "./UpdateItem.types";

export const getStyles = (props: UpdateItemStyleProps): UpdateItemStyles => {
	const { className, theme } = props;

	return {
		root: [
			className,
			{
				display: "flex",
				margin: "0 auto",
				width: "100%",
				padding: 20,

				selectors: {
					":hover, :hover:active": {
						textDecoration: "none",
						backgroundColor: theme.semanticColors.bodyBackgroundHovered,
					},

					[getMinWidthSelector("sm")]: {
						maxWidth: 720,

						backgroundColor: theme.semanticColors.bodyStandoutBackground,
						borderRadius: theme.effects.roundedCorner2,
						borderColor: theme.semanticColors.bodyDivider,
						borderWidth: 1,
						borderStyle: "solid",
					},
				},
			},
		],

		iconContainer: {
			marginRight: 16,
			height: 44,
			width: 44,
			padding: 6,

			filter: theme.semanticColors.bodyBackground === "#000000" ? "invert(20%)" : undefined,
		},

		infoContainer: {
			display: "flex",
			flexDirection: "column",
			flex: 1,
		},

		subComponentStyles: {
			image: {
				root: {
					height: "100%",
					width: "100%",
				},
			},

			courseName: {
				root: {
					marginBottom: 8,

					fontWeight: "bold",
				},
			},

			publishedAt: {
				root: {
					marginTop: "auto",
					marginLeft: "auto",
				},
			},
		},
	};
};
