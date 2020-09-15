import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type HeaderProps = {
	title?: string | React.ReactNode | (() => React.ReactNode);
	right?: React.ReactNode;

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<HeaderStyleProps, HeaderStyles>;
};

export type HeaderStyleProps = {
	theme: ITheme;
	className?: string;
};

export type HeaderStyles = {
	root: IStyle;
	title: IStyle;
};
