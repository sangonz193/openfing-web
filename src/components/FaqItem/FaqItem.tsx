import { styled } from "@fluentui/react/lib/Utilities";

import { FaqItemBase } from "./FaqItem.base";
import { getStyles } from "./FaqItem.styles";
import { FaqItemProps, FaqItemStyleProps, FaqItemStyles } from "./FaqItem.types";

export const FaqItem = styled<FaqItemProps, FaqItemStyleProps, FaqItemStyles>(
	FaqItemBase,
	getStyles,
	undefined,
	undefined,
	true
);
