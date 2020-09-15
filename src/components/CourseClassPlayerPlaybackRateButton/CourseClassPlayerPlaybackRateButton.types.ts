import type { IContextualMenuProps } from "@fluentui/react/lib/ContextualMenu";
import type { ISliderProps } from "@fluentui/react/lib/Slider";
import type { IStackProps } from "@fluentui/react/lib/Stack";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { ITextProps } from "@fluentui/react/lib/Text";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CourseClassPlayerPlaybackRateButtonProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<
		CourseClassPlayerPlaybackRateButtonStyleProps,
		CourseClassPlayerPlaybackRateButtonStyles
	>;
};

export type CourseClassPlayerPlaybackRateButtonStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CourseClassPlayerPlaybackRateButtonStyles = {
	root: IStyle;
	contextualMenuItem: IStyle;

	subComponentStyles: {
		commandButtonText: Required<ITextProps>["styles"];
		renderMenuListWrapper: Required<IStackProps>["styles"];
		renderMenuListDefaultRendererContainer: Required<IStackProps>["styles"];
		renderMenuListSeparator: Required<IStackProps>["styles"];
		menu: Required<IContextualMenuProps>["styles"];
		contextMenuSliderWrapper: Required<IStackProps>["styles"];
		contextMenuSliderText: Required<ITextProps>["styles"];
		contextMenuSlider: Required<ISliderProps>["styles"];
	};
};
