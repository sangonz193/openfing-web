import { CourseMasterStyleProps, CourseMasterStyles } from "./CourseMaster.types";

export const getStyles = (props: CourseMasterStyleProps): CourseMasterStyles => {
	const { theme, showCourseClassListDropdown } = props;

	return {
		root: {
			backgroundColor: theme.semanticColors.listBackground,

			overflow: "auto",
		},

		dropdownsContainer: {
			display: "flex",
			padding: "12px 12px 0",
			justifyContent: "flex-end",
		},

		subComponentStyles: {
			editionsSpinner: {
				root: {
					marginTop: 10,
				},
			},

			itemSeparator: {
				root: {
					height: 0,
					padding: 0,
				},
			},

			editionDropdown: {
				root: showCourseClassListDropdown && {
					marginRight: 10,
				},
			},
		},
	};
};
