import { css, makeStyles } from "@fluentui/react"
import { getUuid } from "@sangonz193/utils/getUuid"

export type PostTimestampStyleProps = {
	className: string | undefined
}

export const postTimestampClassNames = {
	wrapper: `wrapper-${getUuid()}`,
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			backgroundColor: theme.semanticColors.bodyFrameBackground,
			borderRadius: theme.effects.roundedCorner2,
			marginTop: 5,
			marginBottom: 5,
		},
	}
})

export function usePostTimestampStyles(props: PostTimestampStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(postTimestampClassNames.wrapper, styles.wrapper, props.className),
	}
}
