import { css, makeStyles } from "@fluentui/react"

export type CourseClassPlayerVideoStyleProps = {
	className: string | undefined
	fullscreen: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			width: "100%",
			display: "flex",
			margin: "0 auto",
			maxHeight: "100%",
		},

		wrapperFullscreen: {
			height: "100vh",
			width: "100vw",
		},
	}
})

export function useCourseClassPlayerVideoStyles({ className, fullscreen }: CourseClassPlayerVideoStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, className, fullscreen && styles.wrapperFullscreen),
	}
}
