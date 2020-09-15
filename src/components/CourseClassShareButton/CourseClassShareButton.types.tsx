import type { IButtonProps } from "@fluentui/react/lib/Button";
import type { ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CourseClassShareButtonProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseClassShareButtonStyleProps, CourseClassShareButtonStyles>;
};

export type CourseClassShareButtonStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CourseClassShareButtonStyles = {
	subComponentStyles: {
		commandButton: Required<IButtonProps>["styles"];
	};
};
