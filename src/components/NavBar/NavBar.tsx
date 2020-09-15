import { styled } from "@fluentui/react/lib/Utilities";

import { NavBarBase } from "./NavBar.base";
import { getStyles } from "./NavBar.styles";
import { NavBarProps, NavBarStyleProps, NavBarStyles } from "./NavBar.types";

export const NavBar = styled<NavBarProps, NavBarStyleProps, NavBarStyles>(
	NavBarBase,
	getStyles,
	undefined,
	undefined,
	true
);
