import type { ILinkProps, ITextProps } from "@fluentui/react";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CourseClassPlayerChapterItemProps = {
	vttCue: VTTCue;
	requestClosePanel: () => void;

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseClassPlayerChapterItemStyleProps, CourseClassPlayerChapterItemStyles>;
};

export type CourseClassPlayerChapterItemStyleProps = {
	isActive: boolean;

	theme: ITheme;
	className?: string;
};

export type CourseClassPlayerChapterItemStyles = {
	activeIndicator: IStyle;
	subComponentStyles: {
		link: Required<ILinkProps>["styles"];
		seconds: Required<ITextProps>["styles"];
	};
};
