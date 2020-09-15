import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CourseClassDownloadModalProps = {
	visible: boolean;
	onClose: () => void;

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseClassDownloadModalStyleProps, CourseClassDownloadModalStyles>;
};

export type CourseClassDownloadModalStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CourseClassDownloadModalStyles = {
	root: IStyle;
};
