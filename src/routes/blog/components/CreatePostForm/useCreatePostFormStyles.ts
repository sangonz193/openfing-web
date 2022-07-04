import { css, makeStyles } from "@fluentui/react"
import { getUuid } from "@sangonz193/utils/getUuid"

export type CreatePostFormStyleProps = {
	className: string | undefined
}

export const createPostFormClassNames = {
	wrapper: `wrapper-${getUuid()}`,
}

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

export function useCreatePostFormStyles(props: CreatePostFormStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(createPostFormClassNames.wrapper, styles.wrapper, props.className),
		deleteButton: styles.deleteButton,
	}
}
