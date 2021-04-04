import { css, makeStyles } from "@fluentui/react"

export type CourseClassPlayerStyleProps = {
	className: string | undefined
	fullscreen: boolean
	hideCursor: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			position: "relative",

			backgroundColor: "#000",
		},

		wrapperHideCursor: {
			cursor: "none",
		},

		wrapperFullscreen: {
			maxHeight: "70vh",
		},

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

			"> *": {
				pointerEvents: "auto",
			},
		},

		spinner: {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",

			"> div": {
				height: 50,
				width: 50,

				borderWidth: 3,
			},
		},

		bottomControls: {
			margin: "auto 10px 10px",
			width: "100%",
		},

		bottomControlsFullscreen: {
			margin: "auto 0 0",

			borderRadius: 0,
		},
	}
})

export function useCourseClassPlayerStyles({ className, fullscreen, hideCursor }: CourseClassPlayerStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(
			styles.wrapper,
			className,
			fullscreen && styles.wrapperFullscreen,
			hideCursor && styles.wrapperHideCursor
		),
		controlsWrapper: styles.controlsWrapper,
		layerHost: styles.layerHost,
		spinner: styles.spinner,
		bottomControls: css(styles.bottomControls, fullscreen && styles.bottomControlsFullscreen),
	}
}
