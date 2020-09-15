import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type SettingsProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<SettingsStyleProps, SettingsStyles>;
};

export type SettingsStyleProps = {
	theme: ITheme;
	className?: string;
};

export type SettingsStyles = {
	root: IStyle;
	appearanceSection: IStyle;
	aboutSection: IStyle;
};
