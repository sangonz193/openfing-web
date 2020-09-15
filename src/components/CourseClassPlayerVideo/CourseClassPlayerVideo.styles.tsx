import { CourseClassPlayerVideoStyleProps, CourseClassPlayerVideoStyles } from "./CourseClassPlayerVideo.types";

export const getStyles = (props: CourseClassPlayerVideoStyleProps): CourseClassPlayerVideoStyles => {
	return {
		root: [
			{
				width: "100%",
				display: "flex",
				margin: "0 auto",
				maxHeight: "100%",
			},
			props.isFullscreen && {
				height: "100vh",
				width: "100vw",
			},
		],
	};
};
