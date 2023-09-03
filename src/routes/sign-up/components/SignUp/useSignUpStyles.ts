import { makeStyles } from "@fluentui/react"

const useStyles = makeStyles(() => {
	return {
		wrapper: {
			overflow: "auto",
		},
	}
})

export function useSignUpStyles() {
	const styles = useStyles()

	return {
		wrapper: styles.wrapper,
	}
}
