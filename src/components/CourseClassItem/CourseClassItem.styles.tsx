import { CourseClassItemStyleProps, CourseClassItemStyles } from "./CourseClassItem.types";

export const getStyles = (props: CourseClassItemStyleProps): CourseClassItemStyles => {
	const { theme, isActive } = props;

	return {
		root: [
			{
				display: "block",
				padding: "16px 0",

				color: theme.semanticColors.buttonText,

				selectors: {
					"&:hover, &:hover, &:hover:active": {
						backgroundColor: props.theme.semanticColors.buttonBackgroundHovered,
						color: theme.semanticColors.buttonTextHovered,

						textDecoration: "none",
					},

					":focus": {
						color: theme.semanticColors.buttonTextHovered,
					},
				},
			},

			isActive && {
				backgroundColor: props.theme.semanticColors.accentButtonBackground,
				color: theme.semanticColors.accentButtonText,

				selectors: {
					"&:hover, &:hover, &:hover:active": {
						backgroundColor: props.theme.semanticColors.primaryButtonBackgroundHovered,
						color: theme.semanticColors.primaryButtonTextHovered,

						textDecoration: "none",
					},

					":focus": {
						color: theme.semanticColors.primaryButtonTextHovered,
					},
				},
			},
		],

		content: {
			display: "flex",
			height: "100%",
			alignItems: "center",
		},

		subComponentStyles: {
			courseClassNumber: {
				root: [
					{
						width: 40,
						flexShrink: 0,

						textAlign: "center",
						fontWeight: "bold",
					},

					isActive && {
						color: theme.semanticColors.accentButtonText,
					},
				],
			},

			courseClassName: {
				root: [
					theme.fonts.mediumPlus,
					{
						paddingRight: 10,
					},

					isActive && {
						color: theme.semanticColors.accentButtonText,
					},
				],
			},
		},
	};
};
