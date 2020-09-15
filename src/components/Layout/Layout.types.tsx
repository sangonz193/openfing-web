import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

import type { HeaderProps } from "../Header";

export type LayoutOptions = {
	header: HeaderProps & {
		hide: boolean;
	};
};

export type LayoutProps = React.PropsWithChildren<{
	routeKey: string;

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<LayoutStyleProps, LayoutStyles>;
}>;

export type LayoutStyleProps = {
	theme: ITheme;
	className?: string;
};

export type LayoutStyles = {
	root: IStyle;
	contentContainer: IStyle;
	screenContainer: IStyle;
};
