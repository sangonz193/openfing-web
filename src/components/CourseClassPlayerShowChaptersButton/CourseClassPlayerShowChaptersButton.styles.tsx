import { CourseClassPlayerShowChaptersButtonStyles } from "./CourseClassPlayerShowChaptersButton.types";

export const getStyles = (): CourseClassPlayerShowChaptersButtonStyles => {
	return {
		subComponentStyles: {
			panel: {
				main: {
					maxWidth: "90%",
				},
				header: {
					paddingBottom: 10,
				},
				commands: {
					flexShrink: 0,
				},
				content: {
					paddingTop: 10,
					paddingLeft: 5,
				},
			},
		},
	};
};
