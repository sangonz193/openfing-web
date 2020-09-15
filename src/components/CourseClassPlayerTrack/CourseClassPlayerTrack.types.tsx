import type { ICalloutProps } from "@fluentui/react/lib/Callout";
import type { ISliderProps } from "@fluentui/react/lib/Slider";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { ITextProps } from "@fluentui/react/lib/Text";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CourseClassPlayerTrackProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseClassPlayerTrackStyleProps, CourseClassPlayerTrackStyles>;
};

export type CourseClassPlayerTrackStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CourseClassPlayerTrackStyles = {
	root: IStyle;
	startTimeWrapper: IStyle;
	startTime: IStyle;
	endTimeWrapper: IStyle;
	endTime: IStyle;
	sliderWrapper: IStyle;
	sliderBackgroundTrack: IStyle;
	sliderBufferedTrack: IStyle;

	subComponentStyles: {
		slider: Required<ISliderProps>["styles"];
		timeSliderCallout: Required<ICalloutProps>["styles"];
		timeSliderCalloutText: Required<ITextProps>["styles"];
	};
};
