import { css, makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../../../styles/getMinWidthSelector"

export type UpdateItemStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			width: "100%",
			alignItems: "center",
		},

		contentWrapper: {
			display: "flex",
			flexDirection: "row",
			margin: "0 auto",
			width: "100%",
			padding: 20,

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

		iconContainer: {
			marginRight: 16,
			height: 44,
			width: 44,
			padding: 6,

			filter: theme.semanticColors.bodyBackground === "#000000" ? "invert(20%)" : undefined,
		},

		infoContainer: {
			flex: 1,
		},

		image: {
			height: "100%",
			width: "100%",
		},

		courseName: {
			marginBottom: 8,

			fontWeight: "bold",
		},

		publishedAt: {
			display: "flex",
			marginTop: "auto",
			marginLeft: "auto",
		},

		liveIndicatorIcon: {
			color: theme.semanticColors.errorIcon,
			marginRight: 5,

			fontSize: 20,
		},
	}
})

export function useUpdateItemStyles({ className }: UpdateItemStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
		contentWrapper: styles.contentWrapper,
		iconContainer: styles.iconContainer,
		infoContainer: styles.infoContainer,
		image: styles.image,
		courseName: styles.courseName,
		dateInfo: styles.publishedAt,
		liveIndicatorIcon: styles.liveIndicatorIcon,
	}
}
