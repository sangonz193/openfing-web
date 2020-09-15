import { styled } from "@fluentui/react/lib/Utilities";

import { FaqsBase } from "./Faqs.base";
import { getStyles } from "./Faqs.styles";
import { FaqsProps, FaqsStyleProps, FaqsStyles } from "./Faqs.types";

export const Faqs = styled<FaqsProps, FaqsStyleProps, FaqsStyles>(FaqsBase, getStyles, undefined, undefined, true);
