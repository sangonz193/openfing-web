import { css, IRawStyle, makeStyles } from "@fluentui/react";

export type CourseDetailStyleProps = {
	className: string | undefined;
};

const useStyles = makeStyles((theme) => {
	const itemStyle: IRawStyle = {
		margin: "10px auto",
		maxWidth: "100%",
		width: 1280,
		padding: "0 16px",
	};

	return {
		wrapper: {
			display: "flex",
			flexDirection: "column",

			background: theme.semanticColors.bodyBackground,

			overflow: "auto",
		},

		container: {
			minHeight: "100%",
			display: "flex",
			flexDirection: "column",
		},

		spinner: {
			margin: "auto",

			"> div": {
				height: 50,
				width: 50,

				borderWidth: 3,
			},
		},

		courseIcon: {
			margin: "auto",
			height: 480,
			width: 480,
			maxHeight: "90%",
			maxWidth: "90%",

			filter: theme.semanticColors.bodyBackground === "#000000" ? "invert(20%)" : undefined,

			img: {
				opacity: 0.5,
			},
		},

		courseIconImage: {
			opacity: 0.5,
		},

		courseClassName: {
			...itemStyle,
			marginTop: 20,
			marginBottom: 0,

			color: theme.semanticColors.bodyText,

			fontWeight: "normal",
		},

		courseClassDate: {
			...itemStyle,
			color: theme.semanticColors.bodyText,
		},

		separator: {
			maxWidth: "100%",
			width: 1280,
			margin: "10px auto",
			padding: 0,
		},

		commandBar: {
			...itemStyle,
		},

		commandBarPrimarySet: {
			fontSize: theme.fonts.mediumPlus.fontSize,
		},
	};
});

export function useCourseDetailStyles({ className }: CourseDetailStyleProps) {
	const styles = useStyles();

	return {
		wrapper: css(styles.wrapper, className),
		container: styles.container,
		spinner: styles.spinner,
		courseIcon: styles.courseIcon,
		courseIconImage: styles.courseIconImage,
		courseClassName: styles.courseClassName,
		courseClassDate: styles.courseClassDate,
		separator: styles.separator,
		commandBar: styles.commandBar,
	};
}
