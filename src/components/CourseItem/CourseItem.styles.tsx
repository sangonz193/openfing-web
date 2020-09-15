import { getMinWidthSelector } from "src/style/getMinWidthSelector";

import { CourseItemStyleProps, CourseItemStyles } from "./CourseItem.types";

export const getStyles = (props: CourseItemStyleProps): CourseItemStyles => {
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

		imageContainer: {
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

			year: {
				root: {
					margin: "auto 0 0 auto",
				},
			},
		},
	};
};
