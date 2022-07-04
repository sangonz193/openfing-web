import { css, makeStyles } from "@fluentui/react"

export type LoginStyleProps = {
	className: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			flexGrow: 1,
			overflow: "auto",
		},

		form: {
			margin: "auto",
		},
	}
})

export function useLoginStyles({ className }: LoginStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),

		form: styles.form,
	}
}
