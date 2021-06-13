import { css, makeStyles } from "@fluentui/react"

export type CreateCourseClassListFormStyleProps = {
	className: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {},
	}
})

export function useCreateCourseClassFormStyles({ className }: CreateCourseClassListFormStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
	}
}
