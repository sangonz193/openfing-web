import { css, makeStyles } from "@fluentui/react"

export type CourseMasterStyleProps = {
	className: string | undefined
	showCourseClassListDropdown: boolean
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			backgroundColor: theme.semanticColors.listBackground,

			overflow: "auto",

			"> *": {
				flexShrink: 0,
			},
		},

		dropdownListContainer: {
			display: "flex",
			padding: "12px 12px 0",
			justifyContent: "flex-end",
		},

		editionsSpinner: {
			marginTop: 10,
		},

		itemSeparator: {
			height: 0,
			padding: 0,
		},

		editionDropdown: {
			marginRight: 10,
		},
	}
})

export function useCourseMasterStyles(props: CourseMasterStyleProps) {
	const styles = useStyles()
	const { showCourseClassListDropdown } = props

	return {
		wrapper: css(styles.wrapper, props.className),
		dropdownListContainer: styles.dropdownListContainer,
		editionsSpinner: styles.editionsSpinner,
		itemSeparator: styles.itemSeparator,
		editionDropdown: css(showCourseClassListDropdown && styles.editionDropdown),
	}
}
