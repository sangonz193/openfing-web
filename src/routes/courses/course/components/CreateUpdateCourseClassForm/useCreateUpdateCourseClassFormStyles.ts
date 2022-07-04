import { css, makeStyles } from "@fluentui/react"

export type CreateUpdateCourseClassFormStyleProps = {
	className: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {},
	}
})

export function useCreateUpdateCourseClassFormStyles({ className }: CreateUpdateCourseClassFormStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className),
	}
}
