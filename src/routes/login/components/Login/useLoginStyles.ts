import { makeStyles } from "@fluentui/react"

export type LoginStyleProps = {}

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

export function useLoginStyles() {
	const styles = useStyles()

	return {
		wrapper: styles.wrapper,
		form: styles.form,
	}
}
