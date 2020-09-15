import type { IButtonProps } from "@fluentui/react/lib/Button";
import type { ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CourseClassDownloadButtonProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseClassDownloadButtonStyleProps, CourseClassDownloadButtonStyles>;
};

export type CourseClassDownloadButtonStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CourseClassDownloadButtonStyles = {
	subComponentStyles: {
		commandButton: Required<IButtonProps>["styles"];
	};
};
