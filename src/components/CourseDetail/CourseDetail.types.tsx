import type { ICommandBarProps } from "@fluentui/react/lib/CommandBar";
import type { IImageProps } from "@fluentui/react/lib/Image";
import type { ISeparatorProps } from "@fluentui/react/lib/Separator";
import type { ISpinnerProps } from "@fluentui/react/lib/Spinner";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { ITextProps } from "@fluentui/react/lib/Text";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CourseDetailProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseDetailStyleProps, CourseDetailStyles>;
};

export type CourseDetailStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CourseDetailStyles = {
	root: IStyle;
	container: IStyle;

	subComponentStyles: {
		spinner: Required<ISpinnerProps>["styles"];
		courseIcon: Required<IImageProps>["styles"];
		courseClassName: Required<ITextProps>["styles"];
		courseClassDate: Required<ITextProps>["styles"];
		separator: Required<ISeparatorProps>["styles"];
		commandBar: Required<ICommandBarProps>["styles"];
	};
};
