import { css, makeStyles } from "@fluentui/react"

export type LoginFormStyleProps = {
	className: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			maxWidth: 300,
			margin: 20,
		},
	}
})

export function useLoginFormStyles({ className }: LoginFormStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
	}
}
