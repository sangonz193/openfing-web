import { IRawStyle } from "@fluentui/react/lib/Styling";

import { CourseDetailStyleProps, CourseDetailStyles } from "./CourseDetail.types";

export const getStyles = (props: CourseDetailStyleProps): CourseDetailStyles => {
	const { theme } = props;

	const itemStyle: IRawStyle = {
		margin: "10px auto",
		maxWidth: 1280,
		width: "100%",
		padding: "0 16px",
	};

	return {
		root: [
			{
				display: "flex",
				flexDirection: "column",

				background: theme.semanticColors.bodyBackground,

				overflow: "auto",
			},
			props.className,
		],

		container: {
			minHeight: "100%",
			display: "flex",
			flexDirection: "column",
		},

		subComponentStyles: {
			spinner: {
				root: {
					margin: "auto",
				},

				circle: {
					height: 50,
					width: 50,

					borderWidth: 3,
				},
			},

			courseIcon: {
				root: {
					margin: "auto",
					height: 480,
					width: 480,
					maxHeight: "90%",
					maxWidth: "90%",

					filter: theme.semanticColors.bodyBackground === "#000000" ? "invert(20%)" : undefined,
				},
				image: {
					opacity: 0.5,
				},
			},

			courseClassName: {
				root: [
					itemStyle,
					{
						marginTop: 20,
						marginBottom: 0,

						color: theme.semanticColors.bodyText,

						fontWeight: "normal",
					},
				],
			},

			courseClassDate: {
				root: [
					itemStyle,
					{
						color: theme.semanticColors.bodyText,
					},
				],
			},

			separator: {
				root: itemStyle,
			},

			commandBar: {
				root: [itemStyle],
				primarySet: { fontSize: theme.fonts.mediumPlus.fontSize },
			},

			downloadNotice: {
				root: [
					itemStyle,
					{
						marginBottom: 60,

						color: theme.semanticColors.bodyText,
					},
				],
			},

			downloadNoticeLink: {},
		},
	};
};
