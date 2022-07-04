import { css, makeStyles } from "@fluentui/react"

export type SignUpStyleProps = {
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

export function useSignUpStyles({ className }: SignUpStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
	}
}
