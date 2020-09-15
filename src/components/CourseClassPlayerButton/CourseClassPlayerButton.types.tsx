import type { IButtonProps, IButtonStyles } from "@fluentui/react/lib/Button";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { ITextProps } from "@fluentui/react/lib/Text";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CourseClassPlayerButtonProps = {
	iconName?: string;
	text?: string;

	buttonProps?: IButtonProps;

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseClassPlayerButtonStyleProps, CourseClassPlayerButtonStyles>;
};

export type CourseClassPlayerButtonStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CourseClassPlayerButtonStyles = {
	icon: IStyle;
	subComponentStyles: {
		root: IButtonStyles;
		text: Required<ITextProps>["styles"];
	};
};
