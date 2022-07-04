import { makeStyles } from "@fluentui/react"

export type CourseClassPlayerShowChaptersButtonStyleProps = {}

const useStyles = makeStyles(() => {
	return {
		list: {
			marginLeft: -15,
		},
	}
})

export function useCourseClassPlayerShowChaptersButtonStyles({}: CourseClassPlayerShowChaptersButtonStyleProps) {
	const styles = useStyles()

	return {
		...styles,
	}
}
