import { css, makeStyles } from "@fluentui/react"
import { getUuid } from "@sangonz193/utils/getUuid"

export type PostStyleProps = {
	className: string | undefined
	withPublishedAt: boolean
}

export const blogClassNames = {
	wrapper: `wrapper-${getUuid()}`,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			maxWidth: 800,
			padding: 20,
			margin: "20px auto",
			borderColor: theme.semanticColors.bodyDivider,
			borderWidth: 1,
			borderStyle: "solid",
		},

		draft: {
			backgroundColor: theme.semanticColors.warningBackground,
			marginRight: "auto",
			padding: "5px 10px",
			borderRadius: theme.effects.roundedCorner2,
		},

		commandBarOverflowItemButton: {
			backgroundColor: theme.palette.neutralLighterAlt,
			".ms-ContextualMenu-link": {
				fontSize: 16,
				height: 40,
			},
		},

		publishedAtContainer: {
			display: "flex",
			alignItems: "center",
		},

		publishedAtContainerWithoutPublishedAt: {
			marginTop: 5,
		},

		publishedAt: {
			marginRight: 5,
		},

		header: {
			display: "flex",
		},

		title: {
			paddingRight: 5,
			flex: 1,
		},

		editButton: {
			height: 40,
			borderRadius: theme.effects.roundedCorner2,

			i: {
				color: theme.semanticColors.bodyText,
			},

			"&:hover": {
				"i.ms-Button-icon": {
					color: theme.semanticColors.bodyText,
				},
			},
		},

		deleteButton: {
			color: theme.semanticColors.errorText,
			borderColor: theme.semanticColors.errorText,

			":hover": {
				color: theme.semanticColors.errorText,
			},
		},
	}
})

export function usePostStyles(props: PostStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(blogClassNames.wrapper, styles.wrapper, props.className),
		draft: styles.draft,
		editButton: styles.editButton,
		header: styles.header,
		title: styles.title,
		publishedAt: styles.publishedAt,
		publishedAtContainer: css(
			styles.publishedAtContainer,
			!props.withPublishedAt && styles.publishedAtContainerWithoutPublishedAt
		),
		commandBarOverflowItemButton: styles.commandBarOverflowItemButton,
		deleteButton: styles.deleteButton,
	}
}
