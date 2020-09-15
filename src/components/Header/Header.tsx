import { styled } from "@fluentui/react/lib/Utilities";

import { HeaderBase } from "./Header.base";
import { getStyles } from "./Header.styles";
import { HeaderProps, HeaderStyleProps, HeaderStyles } from "./Header.types";

export const Header = styled<HeaderProps, HeaderStyleProps, HeaderStyles>(
	HeaderBase,
	getStyles,
	undefined,
	undefined,
	true
);
