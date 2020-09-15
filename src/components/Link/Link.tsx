import { styled } from "@fluentui/react/lib/Utilities";

import { LinkBase } from "./Link.base";
import { getStyles } from "./Link.styles";
import { LinkProps, LinkStyleProps, LinkStyles } from "./Link.types";

export const Link = styled<LinkProps, LinkStyleProps, LinkStyles>(LinkBase, getStyles, undefined, undefined, true);
