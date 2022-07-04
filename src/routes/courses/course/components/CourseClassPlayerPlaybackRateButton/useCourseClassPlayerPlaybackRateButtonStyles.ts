import type { ICalloutContentStyles } from "@fluentui/react"
import { makeStyles } from "@fluentui/react"

export type CourseClassPlayerPlaybackRateButtonStyleProps = {}

const useStyles = makeStyles((theme) => {
	return {
		button: {
			minWidth: 40,
			paddingLeft: 5,
			paddingRight: 5,
		},

		contextualMenuItem: {
			".ms-ContextualMenu-secondaryText": {
				paddingRight: 10,
			},
			".ms-ContextualMenu-itemText": {
				fontWeight: "bold",
			},
		},

		commandButtonText: {
			...theme.fonts.xSmall,
			fontWeight: "bold",
		},

		renderMenuListWrapper: {
			height: "100%",
		},

		renderMenuListDefaultRendererContainer: {
			overflow: "auto",
			height: "100%",
		},

		renderMenuListSeparator: {
			height: 1,
			backgroundColor: theme.semanticColors.bodyDivider,
		},

		menu: {
			backgroundColor: theme.semanticColors.bodyStandoutBackground,

			// TODO
			container: {
				maxHeight: "100%",

				".ms-FocusZone": {
					height: "100%",
				},

				".ms-FocusZone > div": {
					height: "100%",
				},
			},

			// TODO
			subComponentStyles: {
				callout: {
					calloutMain: {
						display: "flex",
					},
				} as ICalloutContentStyles,
			},
		},

		contextMenuSliderWrapper: {
			padding: 10,
			flexShrink: "0 !important",
		},

		contextMenuSliderText: {
			margin: "0 auto",
			fontWeight: "bold",
		},

		contextMenuSlider: {
			touchAction: "none",
			flexShrink: 0,
			minWidth: 180,
		},
	}
})

export function useCourseClassPlayerPlaybackRateButtonStyles({}: CourseClassPlayerPlaybackRateButtonStyleProps) {
	const styles = useStyles()

	return {
		...styles,
	}
}
