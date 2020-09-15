import { CourseClassShareModalStyles } from "./CourseClassShareModal.types";

export const getStyles = (): CourseClassShareModalStyles => {
	return {
		subComponentStyles: {
			urlTextField: {
				field: {
					fontSize: 16,
				},

				fieldGroup: {
					borderTopRightRadius: 0,
					borderBottomRightRadius: 0,
				},
			},

			copyButton: {
				root: {
					borderTopLeftRadius: 0,
					borderBottomLeftRadius: 0,
					padding: "0 5px",
					minWidth: 0,
				},
			},

			messageBarDismissIcon: {
				root: {
					fontSize: "1rem !important",
					height: "auto !important",
				},
			},

			textField: {
				field: {
					fontSize: 16,
				},
			},
		},
	};
};
