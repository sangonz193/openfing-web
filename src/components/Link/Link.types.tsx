import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type LinkProps = {
	anchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement>;

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<LinkStyleProps, LinkStyles>;
};

export type LinkStyleProps = {
	theme: ITheme;
	className?: string;
};

export type LinkStyles = {
	root: IStyle;
};
