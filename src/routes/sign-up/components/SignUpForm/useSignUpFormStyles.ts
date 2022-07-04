import { css, makeStyles } from "@fluentui/react"

export type SignUpFormStyleProps = {
	className: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			maxWidth: 300,
			margin: "20px auto",
		},
	}
})

export function useSignUpFormStyles({ className }: SignUpFormStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
	}
}
