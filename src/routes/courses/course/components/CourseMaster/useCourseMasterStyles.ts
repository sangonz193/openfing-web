import { makeStyles } from "@fluentui/react"

const useStyles = makeStyles((theme) => {
	return {
		dropdownListContainer: {
			display: "flex",
			flexWrap: "wrap",
			flexDirection: "row",
			padding: "12px 12px 0",
		},

		editionsSpinner: {
			marginTop: 10,
		},

		courseClassListOption: {
			marginBottom: 10,
			marginRight: 10,
			borderRadius: 20,
			paddingLeft: 10,
			paddingRight: 10,
			height: 35,
			lineHeight: 35,
			backgroundColor: theme.palette.neutralLighter,
			borderColor: `${theme.semanticColors.accentButtonBackground} !important`,
			borderLeftWidth: `${1}px !important`,
			...theme.fonts.medium,
			textDecoration: "none !important",

			":hover": {
				color: theme.semanticColors.bodyText,
				backgroundColor: theme.palette.neutralLight,
			},

			":active, :focus, :active:focus": {
				color: theme.semanticColors.bodyText,
				backgroundColor: theme.palette.neutralLighter,
			},
		},

		activeCourseClassListOption: {
			backgroundColor: theme.semanticColors.primaryButtonBackground,
			color: theme.semanticColors.primaryButtonText,

			":hover, :focus": {
				backgroundColor: theme.semanticColors.primaryButtonBackground,
				color: theme.semanticColors.primaryButtonTextHovered,
			},
		},
	}
})

export function useCourseMasterStyles() {
	const styles = useStyles()

	return {
		dropdownListContainer: styles.dropdownListContainer,
		editionsSpinner: styles.editionsSpinner,
		courseClassListOption: styles.courseClassListOption,
		activeCourseClassListOption: styles.activeCourseClassListOption,
	}
}
