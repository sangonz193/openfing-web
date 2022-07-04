import { css, makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../styles/getMinWidthSelector"

export type CreativeCommonsFooterStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			flexShrink: 0,
			padding: 10,
			marginTop: 10,
			width: "100%",

			borderTopColor: theme.semanticColors.bodyDivider,
			borderTopWidth: 1,
			borderTopStyle: "solid",

			[getMinWidthSelector("md")]: {
				flexDirection: "row",
				alignItems: "center",
			},
		},

		imageContainer: {
			marginBottom: 10,

			[getMinWidthSelector("md")]: {
				marginBottom: 0,
				marginRight: 10,
			},
		},

		image: {
			"> img": {
				height: 40,
			},
		},

		link: {
			color: theme.semanticColors.link,
		},
	}
})

export function useCreativeCommonsFooterStyles({ className }: CreativeCommonsFooterStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
		imageContainer: styles.imageContainer,
		image: styles.image,
		link: styles.link,
	}
}
