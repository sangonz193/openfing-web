import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

import { FaqItemFaqFragment } from "./FaqItem.graphql.generated";

export type FaqItemProps = {
	faq: FaqItemFaqFragment;

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<FaqItemStyleProps, FaqItemStyles>;
};

export type FaqItemStyleProps = {
	theme: ITheme;
	className?: string;
};

export type FaqItemStyles = {
	root: IStyle;
	title: IStyle;
	content: IStyle;
};
