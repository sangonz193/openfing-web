import type { IButtonProps } from "@fluentui/react/lib/Button";
import type { IIconProps } from "@fluentui/react/lib/Icon";
import type { ITheme } from "@fluentui/react/lib/Styling";
import type { ITextFieldProps } from "@fluentui/react/lib/TextField";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CourseClassShareModalProps = {
	visible: boolean;
	onClose: () => void;

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseClassShareModalStyleProps, CourseClassShareModalStyles>;
};

export type CourseClassShareModalStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CourseClassShareModalStyles = {
	subComponentStyles: {
		urlTextField: Required<ITextFieldProps>["styles"];
		copyButton: Required<IButtonProps>["styles"];
		messageBarDismissIcon: Required<IIconProps>["styles"];
		textField: Required<ITextFieldProps>["styles"];
	};
};
