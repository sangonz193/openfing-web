import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

import { NavBarButtonProps } from "../NavBarButton";

export type NavBarProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<NavBarStyleProps, NavBarStyles>;
};

export type NavBarStyleProps = {
	theme: ITheme;
	className?: string;
};

export type NavBarStyles = {
	root: IStyle;

	subComponentStyles: {
		settingsButton: Required<NavBarButtonProps>["styles"];
	};
};
