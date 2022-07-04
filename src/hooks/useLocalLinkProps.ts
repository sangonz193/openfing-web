import type { ILinkProps } from "@fluentui/react"
import React from "react"

import { useHistory } from "../modules/Navigation/useHistory"

export function useLocalLinkProps(props: Partial<ILinkProps>): ILinkProps {
	const { href, onClick } = props
	const history = useHistory()

	const handleClick = React.useCallback<Exclude<ILinkProps["onClick"], undefined>>(
		(e) => {
			if (e.metaKey) {
				return
			}

			e.preventDefault()

			if (href) {
				history.push(href)
			}

			onClick?.(e)
		},
		[onClick, history, href]
	)

	return React.useMemo(
		() => ({
			...props,
			onClick: handleClick,
		}),
		[props, handleClick]
	)
}
