import { css, makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../../../styles/getMinWidthSelector"

export type CourseItemStyleProps = {
	className: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
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

		imageContainer: {
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

		year: {
			margin: "auto 0 0 auto",
		},
	}
})

export function useCourseItemStyles({ className }: CourseItemStyleProps) {
	const styles = useStyles()

	return {
		...styles,
		wrapper: css(styles.wrapper, className),
	}
}
