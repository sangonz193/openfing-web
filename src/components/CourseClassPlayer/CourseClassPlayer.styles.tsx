import { CourseClassPlayerStyleProps, CourseClassPlayerStyles } from "./CourseClassPlayer.types";

export const getStyles = (props: CourseClassPlayerStyleProps): CourseClassPlayerStyles => {
	return {
		root: [
			{
				display: "flex",
				position: "relative",

				backgroundColor: "#000",
			},
			props.hideCursor && {
				cursor: "none",
			},
			!props.isFullscreen && {
				maxHeight: "70vh",
			},
		],

		controlsWrapper: {
			position: "absolute",
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			display: "flex",
		},

		layerHost: {
			position: "absolute",
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			pointerEvents: "none",
			overflow: "hidden",
			selectors: {
				"> *": {
					pointerEvents: "auto",
				},
			},
		},

		subComponentStyles: {
			spinner: {
				root: {
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				},

				circle: {
					height: 50,
					width: 50,

					borderWidth: 3,
				},
			},

			bottomControls: {
				root: [
					{
						margin: "auto 10px 10px",
						width: "100%",
					},
					props.isFullscreen && {
						margin: "auto 0 0",

						borderRadius: 0,
					},
				],
			},
		},
	};
};
