import { css, makeStyles } from "@fluentui/react"

export type FaqItemStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			margin: "0 auto",
			padding: 20,
			maxWidth: 720,
		},

		title: {
			color: theme.semanticColors.bodyText,

			textAlign: "center",
		},

		content: {
			color: theme.semanticColors.bodyText,

			textAlign: "center",

			"> a": {
				color: theme.semanticColors.link,

				":hover": {
					color: theme.semanticColors.linkHovered,
				},
			},
		},
	}
})

export function useFaqItemStyles({ className }: FaqItemStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
		title: styles.title,
		content: styles.content,
	}
}
