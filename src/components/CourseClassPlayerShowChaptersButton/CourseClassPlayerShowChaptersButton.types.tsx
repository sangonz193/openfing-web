import { IPanelProps } from "@fluentui/react";
import type { ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CourseClassPlayerShowChaptersButtonProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<
		CourseClassPlayerShowChaptersButtonStyleProps,
		CourseClassPlayerShowChaptersButtonStyles
	>;
};

export type CourseClassPlayerShowChaptersButtonStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CourseClassPlayerShowChaptersButtonStyles = {
	subComponentStyles: {
		panel: Required<IPanelProps>["styles"];
	};
};
