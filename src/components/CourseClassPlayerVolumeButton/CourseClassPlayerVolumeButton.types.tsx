import type { IHoverCardProps } from "@fluentui/react/lib/HoverCard";
import type { ISliderStyleProps, ISliderStyles } from "@fluentui/react/lib/Slider";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CourseClassPlayerVolumeButtonProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseClassPlayerVolumeButtonStyleProps, CourseClassPlayerVolumeButtonStyles>;
};

export type CourseClassPlayerVolumeButtonStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CourseClassPlayerVolumeButtonStyles = {
	sliderWrapper: IStyle;
	subComponentStyles: {
		hoverCard: Required<IHoverCardProps>["styles"];
		slider: IStyleFunctionOrObject<ISliderStyleProps, ISliderStyles>;
	};
};
