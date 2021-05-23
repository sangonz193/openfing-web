import { css, makeStyles } from "@fluentui/react"

export type AdminSecretStyleProps = {
	className: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			display: "flex",
			flexDirection: "column",
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},

		container: {
			display: "flex",
			flexDirection: "column",
		},

		secretContainer: {},

		sendButton: {
			marginLeft: "auto",
			marginTop: 30,
		},
	}
})

export function useAdminSecretStyles({ className }: AdminSecretStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
		container: styles.container,
		secretContainer: styles.secretContainer,
		sendButton: styles.sendButton,
	}
}
