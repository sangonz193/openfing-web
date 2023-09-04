import type { IStyle } from "@fluentui/react"
import { css, makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../../../../styles/getMinWidthSelector"

export type CourseClassPlayerStyleProps = {
	className: string | undefined
	fullscreen: boolean
	hideCursor: boolean
}

const useStyles = makeStyles((theme) => {
	const commonSideTapArea: IStyle = {
		position: "absolute",
		top: 0,
		bottom: 0,
		width: "50%",
		display: "flex",

		background: "none",
		border: "none",

		outline: "none",
	}

	return {
		wrapper: {
			display: "flex",
			flexDirection: "column",
			position: "relative",

			backgroundColor: "#000",
			borderRadius: "8px",
			overflow: "hidden",
		},

		wrapperHideCursor: {
			cursor: "none",
		},

		wrapperFullscreen: {},

		controlsWrapper: {
			position: "absolute",
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			display: "flex",
		},

		leftTapArea: {
			...commonSideTapArea,
			left: 0,
		},

		rightTapArea: {
			...commonSideTapArea,
			right: 0,
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
			flexShrink: 1,
		},

		bottomControlsFullscreen: {
			margin: "auto 0 0",

			borderRadius: 0,
		},

		messageBarContainer: {
			position: "relative",
			margin: "0 auto",
			width: 800,
			maxWidth: "100%",

			[getMinWidthSelector("md")]: {
				maxWidth: "80%",
			},
		},

		messageBar: {
			padding: 5,
			...theme.fonts.mediumPlus,

			[getMinWidthSelector("md")]: {
				marginTop: 20,
				borderRadius: theme.effects.roundedCorner4,
			},

			"a.ms-Link": {
				paddingLeft: 0,
			},
		},

		messageBarContainerIcon: {
			fontSize: theme.fonts.xxLarge.fontSize,
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
		leftTapArea: styles.leftTapArea,
		rightTapArea: styles.rightTapArea,
		layerHost: styles.layerHost,
		spinner: styles.spinner,
		bottomControls: css(styles.bottomControls, fullscreen && styles.bottomControlsFullscreen),
		messageBarContainer: styles.messageBarContainer,
		messageBar: styles.messageBar,
		messageBarContainerIcon: styles.messageBarContainerIcon,
	}
}
