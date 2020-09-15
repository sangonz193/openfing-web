import { CourseClassDownloadModalStyleProps, CourseClassDownloadModalStyles } from "./CourseClassDownloadModal.types";

export const getStyles = (props: CourseClassDownloadModalStyleProps): CourseClassDownloadModalStyles => {
	const { className } = props;

	return {
		root: [className],
	};
};
