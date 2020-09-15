import type { ISeparatorProps } from "@fluentui/react/lib/Separator";
import type { ISpinnerProps } from "@fluentui/react/lib/Spinner";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type FaqsProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<FaqsStyleProps, FaqsStyles>;
};

export type FaqsStyleProps = {
	theme: ITheme;
	className?: string;
};

export type FaqsStyles = {
	root: IStyle;
	content: IStyle;

	subComponentStyles: {
		spinner: Required<ISpinnerProps>["styles"];
		separator: Required<ISeparatorProps>["styles"];
	};
};
