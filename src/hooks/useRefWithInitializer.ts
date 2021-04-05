import React from "react"

const SENTINEL = {}

export const useRefWithInitializer = <T>(initializer: () => T): React.MutableRefObject<T> => {
	const ref = React.useRef<T | typeof SENTINEL>(SENTINEL)
	if (ref.current === SENTINEL) {
		ref.current = initializer()
	}

	return ref as React.MutableRefObject<T>
}
