import { Link as FluentLink } from "@fluentui/react/lib/Link";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";
import { useHistory } from "src/hooks/useHistory";

import { LinkProps, LinkStyleProps, LinkStyles } from "./Link.types";

const getClassNames = classNamesFunction<LinkStyleProps, LinkStyles>();

export const LinkBase = (props: React.PropsWithChildren<LinkProps>) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className });

	const { anchorProps } = props;

	const history = useHistory();
	const handleClick = React.useCallback<(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void>(
		anchorProps.onClick ||
			((e) => {
				e.preventDefault();

				if (anchorProps.href) {
					const target = anchorProps.target || "_self";

					if (
						target === "_self" &&
						!anchorProps.href.startsWith("http") &&
						!anchorProps.href.startsWith("mailto:")
					)
						history.push(anchorProps.href);
					else window.open(anchorProps.href, target);
				}
			}),
		[anchorProps.onClick, history]
	);

	return (
		<FluentLink {...props.anchorProps} className={classNames.root} onClick={handleClick}>
			{props.children}
		</FluentLink>
	);
};
