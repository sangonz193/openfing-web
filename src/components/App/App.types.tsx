import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type AppProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<AppStyleProps, AppStyles>;
};

export type AppStyleProps = {
	theme: ITheme;
	className?: string;
};

export type AppStyles = {
	root: IStyle;
};
