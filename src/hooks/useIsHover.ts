import React from "react"

import { useAppStore } from "../modules/App"
import { useObservableStates } from "./useObservableStates"

export const useIsHover = (): [
	boolean,
	Record<
		keyof Pick<
			Required<React.ButtonHTMLAttributes<HTMLButtonElement>>,
			"onMouseOver" | "onMouseLeave" | "onMouseMove"
		>,
		() => void
	>
] => {
	const appStore = useAppStore()
	const { inputType } = useObservableStates(appStore, ["inputType"])

	const [state, setState] = React.useState(false)

	const mouseMoveTimeout = React.useRef<NodeJS.Timeout>()
	const bind = React.useMemo(
		() => ({
			onMouseOver: () => inputType === "POINTER" && setState(true),
			onMouseLeave: () => inputType === "POINTER" && setState(false),
			onMouseMove: () => {
				if (mouseMoveTimeout.current) {
					clearTimeout(mouseMoveTimeout.current)
					mouseMoveTimeout.current = undefined
				}
			},
		}),
		[inputType]
	)

	React.useEffect(() => {
		if (inputType === "TOUCH") {
			setState(false)
		}
	}, [inputType])

	React.useEffect(() => {
		if (!state) {
			return
		}

		const handler = () => {
			if (!mouseMoveTimeout.current) {
				mouseMoveTimeout.current = setTimeout(() => setState(false), 1000)
			}
		}
		window.addEventListener("mousemove", handler)

		return () => window.removeEventListener("mousemove", handler)
	}, [state])

	return [state, bind]
}
