import type { IFontIconProps } from "@fluentui/react/lib/Icon";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type NavBarButtonProps = {
	id?: string;

	route: string;
	routeName: string;
	exact?: boolean;
	iconProps: IFontIconProps;

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<NavBarButtonStyleProps, NavBarButtonStyles>;
};

export type NavBarButtonStyleProps = {
	isHover: boolean;
	isActive: boolean;

	theme: ITheme;
	className?: string;
};

export type NavBarButtonStyles = {
	root: IStyle;
	iconWrapper: IStyle;
	activeIndicator: IStyle;
	icon: IStyle;
};
