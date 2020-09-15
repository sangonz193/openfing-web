import { styled } from "@fluentui/react/lib/Utilities";

import { NavBarButtonBase } from "./NavBarButton.base";
import { getStyles } from "./NavBarButton.styles";
import { NavBarButtonProps, NavBarButtonStyleProps, NavBarButtonStyles } from "./NavBarButton.types";

export const NavBarButton = styled<NavBarButtonProps, NavBarButtonStyleProps, NavBarButtonStyles>(
	NavBarButtonBase,
	getStyles
);
