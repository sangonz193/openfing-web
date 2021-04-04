import { ILinkProps } from "@fluentui/react"
import React from "react"

import { useHistory } from "../modules/Navigation/useHistory"

export function useLocalLinkProps(props: Partial<ILinkProps>): ILinkProps {
	const history = useHistory()
	const onClick = React.useCallback<Exclude<ILinkProps["onClick"], undefined>>(
		(e) => {
			e.preventDefault()

			if (props.href) {
				const target = props.target || "_self"

				if (target === "_self" && !props.href.startsWith("http")) {
					history.push(props.href)
				} else {
					window.open(props.href, target)
				}
			}

			if (props.onClick) {
				props.onClick(e)
			}
		},
		[props.onClick, history]
	)

	return React.useMemo(
		() => ({
			...props,
			onClick,
		}),
		[props, onClick]
	)
}
