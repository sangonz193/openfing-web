import { css, makeStyles } from "@fluentui/react"
import { getUuid } from "@sangonz193/utils/getUuid"

export type EditCourseClassLiveStateFormStyleProps = {
	className: string | undefined
}

export const editCourseClassLiveStateFormClassNames = {
	wrapper: `wrapper-${getUuid()}`,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {},
		deleteButton: {
			marginTop: 20,
			color: theme.semanticColors.errorText,
			borderColor: theme.semanticColors.errorText,

			":hover": {
				color: theme.semanticColors.errorText,
			},
		},
	}
})

export function useEditCourseClassLiveStateFormStyles(props: EditCourseClassLiveStateFormStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(editCourseClassLiveStateFormClassNames.wrapper, styles.wrapper, props.className),
		deleteButton: styles.deleteButton,
	}
}
