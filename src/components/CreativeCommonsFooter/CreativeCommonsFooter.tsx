import { styled } from "@fluentui/react/lib/Utilities";

import { CreativeCommonsFooterBase } from "./CreativeCommonsFooter.base";
import { getStyles } from "./CreativeCommonsFooter.styles";
import {
	CreativeCommonsFooterProps,
	CreativeCommonsFooterStyleProps,
	CreativeCommonsFooterStyles,
} from "./CreativeCommonsFooter.types";

export const CreativeCommonsFooter = styled<
	CreativeCommonsFooterProps,
	CreativeCommonsFooterStyleProps,
	CreativeCommonsFooterStyles
>(CreativeCommonsFooterBase, getStyles, undefined, undefined, true);
