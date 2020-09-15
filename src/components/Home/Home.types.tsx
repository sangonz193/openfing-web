import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type HomeProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<HomeStyleProps, HomeStyles>;
};

export type HomeStyleProps = {
	theme: ITheme;
	className?: string;
};

export type HomeStyles = {
	root: IStyle;
	backgroundContainer: IStyle;
	backgroundImage: IStyle;
	contentWrapper: IStyle;
	topContentContainer: IStyle;
	title: IStyle;
	newItemList: IStyle;
	newItem: IStyle;
	helpWanted: IStyle;
	suggestions: IStyle;
	suggestionsEmail: IStyle;
};
