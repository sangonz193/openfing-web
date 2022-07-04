import { css, makeStyles } from "@fluentui/react"

export type LoginFormStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			width: 380,
			maxWidth: "90%",
			backgroundColor: theme.semanticColors.bodyBackgroundHovered,
			borderRadius: 2,
			padding: 40,
		},
	}
})

export function useLoginFormStyles({ className }: LoginFormStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
	}
}
