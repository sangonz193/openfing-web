import { css, makeStyles } from "@fluentui/react"
import { getUuid } from "@sangonz193/utils/getUuid"

export type UpdateCourseClassChapterCuesFormStyleProps = {
	className: string | undefined
}

export const updateCourseClassChapterCuesFormClassNames = {
	wrapper: `wrapper-${getUuid()}`,
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {},
		deleteButton: {
			color: theme.semanticColors.errorText,
			borderColor: theme.semanticColors.errorBackground,

			":hover": {
				color: theme.semanticColors.errorText,
				borderColor: theme.semanticColors.errorBackground,
			},
		},
	}
})

export function useUpdateCourseClassChapterCuesFormStyles(props: UpdateCourseClassChapterCuesFormStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(updateCourseClassChapterCuesFormClassNames.wrapper, styles.wrapper, props.className),
		deleteButton: styles.deleteButton,
	}
}
