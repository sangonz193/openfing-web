import { css, makeStyles } from "@fluentui/react"

export type LoginStyleProps = {
	className: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			overflow: "auto",
		},
	}
})

export function useLoginStyles({ className }: LoginStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
	}
}
