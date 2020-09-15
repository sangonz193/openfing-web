import { styled } from "@fluentui/react/lib/Utilities";

import { LayoutBase } from "./Layout.base";
import { getStyles } from "./Layout.styles";
import { LayoutProps, LayoutStyleProps, LayoutStyles } from "./Layout.types";

export const Layout = styled<LayoutProps, LayoutStyleProps, LayoutStyles>(
	LayoutBase,
	getStyles,
	undefined,
	undefined,
	true
);
