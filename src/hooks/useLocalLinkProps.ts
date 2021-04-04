import { ILinkProps } from "@fluentui/react";
import React from "react";

import { useHistory } from "../modules/Navigation/useHistory";

export function useLocalLinkProps(props: Partial<ILinkProps>): ILinkProps {
	const { href, onClick } = props;
	const history = useHistory();

	const handleClick = React.useCallback<Exclude<ILinkProps["onClick"], undefined>>(
		(e) => {
			e.preventDefault();

			if (href) {
				const target = props.target || "_self";

				if (target === "_self" && !href.startsWith("http")) {
					history.push(href);
				} else {
					window.open(href, target);
				}
			}

			onClick?.(e);
		},
		[onClick, history, href]
	);

	return React.useMemo(
		() => ({
			...props,
			onClick: handleClick,
		}),
		[props, handleClick]
	);
}
