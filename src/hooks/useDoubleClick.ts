import React from "react"

const TIMEOUT = 300

// https://medium.com/zattoo_tech/repeatable-double-click-and-hybrid-clicks-solution-with-usedoubleclick-hook-c6c64449abf7
export const useDoubleClick = (options: { onDoubleClick: () => void; onClick?: () => void }) => {
	const { onDoubleClick, onClick } = options
	// we're using useRef here for the useCallback to rememeber the timeout
	const clickTimeout = React.useRef<NodeJS.Timeout>()

	const clearClickTimeout = () => {
		if (clickTimeout.current) {
			clearTimeout(clickTimeout.current)
			clickTimeout.current = undefined
		}
	}

	// return a memoized version of the callback that only changes if one of the dependencies has changed
	return React.useCallback(
		(event: React.MouseEvent) => {
			if (event.defaultPrevented) {
				return
			}
			event.preventDefault()

			if (!clickTimeout.current) {
				clickTimeout.current = setTimeout(() => {
					onClick?.()
					clearClickTimeout()
				}, TIMEOUT)
			} else {
				clearClickTimeout()
				onDoubleClick()
			}
		},
		[onClick, onDoubleClick]
	)
}
