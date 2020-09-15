import type { ICalloutContentStyles } from "@fluentui/react/lib/Callout";

import type {
	CourseClassPlayerPlaybackRateButtonStyleProps,
	CourseClassPlayerPlaybackRateButtonStyles,
} from "./CourseClassPlayerPlaybackRateButton.types";

export const getStyles = (
	props: CourseClassPlayerPlaybackRateButtonStyleProps
): CourseClassPlayerPlaybackRateButtonStyles => {
	const { theme } = props;

	return {
		root: {},

		contextualMenuItem: {
			selectors: {
				".ms-ContextualMenu-secondaryText": {
					paddingRight: 10,
				},
				".ms-ContextualMenu-itemText": {
					fontWeight: "bold",
				},
			},
		},

		subComponentStyles: {
			commandButtonText: {
				root: [
					props.theme.fonts.small,
					{
						fontWeight: "bold",
					},
				],
			},

			renderMenuListWrapper: {
				root: {
					height: "100%",
				},
			},

			renderMenuListDefaultRendererContainer: {
				root: {
					overflow: "auto",
					height: "100%",
				},
			},

			renderMenuListSeparator: {
				root: {
					height: 1,
					backgroundColor: theme.semanticColors.bodyDivider,
				},
			},

			menu: {
				root: {
					backgroundColor: theme.semanticColors.bodyStandoutBackground,
				},

				container: {
					maxHeight: "100%",
					selectors: {
						".ms-FocusZone": {
							height: "100%",
						},

						".ms-FocusZone > div": {
							height: "100%",
						},
					},
				},

				subComponentStyles: {
					callout: {
						calloutMain: {
							display: "flex",
						},
					} as ICalloutContentStyles,
					menuItem: {},
				},
			},

			contextMenuSliderWrapper: {
				root: {
					padding: 10,
					flexShrink: "0 !important",
				},
			},

			contextMenuSliderText: {
				root: {
					margin: "0 auto",
					fontWeight: "bold",
				},
			},

			contextMenuSlider: {
				root: {
					touchAction: "none",
					flexShrink: 0,
					minWidth: 180,
				},
			},
		},
	};
};
