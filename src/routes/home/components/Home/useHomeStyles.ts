import { makeStyles } from "@fluentui/react"

export type HomeStyleProps = {}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			position: "relative",
			flex: "1 1 100%",
		},

		backgroundContainer: {
			position: "absolute",
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},

		backgroundImage: {
			height: "100%",

			backgroundColor: theme.palette.themeSecondary,
		},

		contentWrapper: {
			height: "100%",

			overflow: "auto",
		},

		topContentContainer: {
			margin: "auto",
			maxWidth: 920,
			width: "80%",
			padding: "20px 0",

			zIndex: 1,
		},

		title: {
			color: "rgb(241, 212, 153)",

			textAlign: "center",
		},

		newItem: {
			display: "list-item",
			margin: "20px 12px 0 32px",

			color: "white",

			listStyle: "disc outside none",

			"> span": {
				color: "white",
			},
		},

		helpWanted: {
			paddingTop: "32px",

			color: "rgb(241, 212, 153)",

			textAlign: "center",
		},

		suggestions: {
			paddingTop: "32px",

			color: "white",

			textAlign: "center",
			textTransform: "uppercase",
		},

		suggestionsEmail: {
			display: "inline-block",

			color: "white",
		},
	}
})

export function useHomeStyles({}: HomeStyleProps = {}) {
	const styles = useStyles()

	return {
		wrapper: styles.wrapper,
		backgroundContainer: styles.backgroundContainer,
		backgroundImage: styles.backgroundImage,
		contentWrapper: styles.contentWrapper,
		topContentContainer: styles.topContentContainer,
		title: styles.title,
		newItem: styles.newItem,
		helpWanted: styles.helpWanted,
		suggestions: styles.suggestions,
		suggestionsEmail: styles.suggestionsEmail,
	}
}
