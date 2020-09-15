import { FontIcon } from "@fluentui/react/lib/Icon";
import { Link } from "@fluentui/react/lib/Link";
import { classNamesFunction, css } from "@fluentui/react/lib/Utilities";
import React from "react";
import { useIsHover } from "src/hooks/useIsHover";
import { useLinkProps } from "src/hooks/useLinkProps";
import { useMatchPath } from "src/hooks/useMatchPath";

import { useLocation } from "../../hooks/useLocation";
import { NavBarButtonProps, NavBarButtonStyleProps, NavBarButtonStyles } from "./NavBarButton.types";

const getClassNames = classNamesFunction<NavBarButtonStyleProps, NavBarButtonStyles>();

export const NavBarButtonBase = (props: NavBarButtonProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;

	const location = useLocation();
	const matchPath = useMatchPath(location.pathname, {
		path: props.route,
		exact: props.exact,
	});

	const linkPropsResult = useLinkProps({ title: props.routeName, href: props.route });
	const [isHover, isHoverBindings] = useIsHover();

	const isActive = matchPath !== null;
	const classNames = getClassNames(styles, { theme, isActive, isHover });

	return (
		<Link id={props.id} className={classNames.root} {...linkPropsResult} {...isHoverBindings}>
			<div className={classNames.iconWrapper}>
				{isActive && <div className={classNames.activeIndicator} />}
				<FontIcon {...props.iconProps} className={css(classNames.icon, props.iconProps.className)} />
			</div>
		</Link>
	);
};
