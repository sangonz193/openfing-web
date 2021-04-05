import { makeStyles } from "@fluentui/react"

export type CourseClassShareModalStyleProps = {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		urlTextField: {
			fontSize: 16,

			"div > fieldGroup": {
				borderTopRightRadius: 0,
				borderBottomRightRadius: 0,
			},
		},

		copyButton: {
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
			padding: "0 5px",
			minWidth: 0,
		},

		messageBarDismissIcon: {
			fontSize: "1rem !important",
			height: "auto !important",
		},

		textField: {
			fontSize: 16,
		},
	}
})

export function useCourseClassShareModalStyles({}: CourseClassShareModalStyleProps) {
	const styles = useStyles()

	return {
		...styles,
	}
}
