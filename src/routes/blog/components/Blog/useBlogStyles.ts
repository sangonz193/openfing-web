import { css, makeStyles } from "@fluentui/react"
import { getUuid } from "@sangonz193/utils/getUuid"

export type BlogStyleProps = {
	className: string | undefined
}

export const blogClassNames = {
	wrapper: `wrapper-${getUuid()}`,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			height: "100%",
			overflow: "auto",
		},

		content: {
			minHeight: "100%",
		},

		commandBar: {
			height: "100%",
			"> div": {
				height: "100%",
				"> div": {
					height: "100%",
					".ms-FocusZone": {
						backgroundColor: "transparent",
						height: "100%",
						paddingRight: 0,
						paddingLeft: 0,
					},
				},
			},

			button: {
				width: 49,

				backgroundColor: "transparent",
			},
		},

		commandBarOverflowItemButton: {
			backgroundColor: theme.palette.neutralLighterAlt,
			".ms-ContextualMenu-link": {
				fontSize: 16,
				height: 40,
			},
		},
	}
})

export function useBlogStyles(props: BlogStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(blogClassNames.wrapper, styles.wrapper, props.className),
		content: styles.content,
		commandBar: styles.commandBar,
		commandBarOverflowItemButton: styles.commandBarOverflowItemButton,
	}
}
