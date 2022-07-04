import { css, makeStyles } from "@fluentui/react"
import { getUuid } from "@sangonz193/utils/getUuid"

export type EditCourseFormStyleProps = {
	className: string | undefined
}

export const editCourseFormClassNames = {
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

export function useEditCourseFormStyles(props: EditCourseFormStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(editCourseFormClassNames.wrapper, styles.wrapper, props.className),
		deleteButton: styles.deleteButton,
	}
}
