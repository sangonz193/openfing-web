import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CreativeCommonsFooterProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CreativeCommonsFooterStyleProps, CreativeCommonsFooterStyles>;
};

export type CreativeCommonsFooterStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CreativeCommonsFooterStyles = {
	root: IStyle;
	imageContainer: IStyle;
	image: IStyle;
	text: IStyle;
	link: IStyle;
};
