import { ILinkProps } from "@fluentui/react/lib/Link";
import React from "react";

import { useHistory } from "./useHistory";

export const useLinkProps = (props: ILinkProps): ILinkProps => {
	const history = useHistory();
	const onClick = React.useCallback<(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void>(
		(e) => {
			e.preventDefault();

			if (props.href) {
				const target = props.target || "_self";

				if (target === "_self" && !props.href.startsWith("http")) history.push(props.href);
				else window.open(props.href, target);
			}

			if (props.onClick) props.onClick(e);
		},
		[props.onClick, history]
	);

	return { ...props, onClick };
};
