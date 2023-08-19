import { IsFocusVisibleClassName } from "@fluentui/react/lib/Utilities"
import React from "react"
import { observe } from "selector-observer"

import { useIsFocused } from "../hooks/useIsFocused"
import { useRootEventListener } from "../rootEventListeners"
import { useAppStore } from "./useAppStore"

export const AppManager: React.FC = () => {
	const store = useAppStore()

	const [focused, focusBindings] = useIsFocused({
		defaultFocused: store.isFocused.getValue(),
	})

	React.useEffect(() => {
		store.isFocused.next(focused)
	}, [focused])

	useRootEventListener("onFocus", focusBindings.onFocus)
	useRootEventListener("onBlur", focusBindings.onBlur)

	const isTouchTimeoutRef = React.useRef<NodeJS.Timeout>()
	const isTouchRef = React.useRef<boolean>()
	React.useEffect(() => {
		if (store.inputType.getValue() === "POINTER" && "ontouchstart" in window) {
			store.inputType.next("TOUCH")
		}

		const handleTouchStart = () => {
			if (isTouchTimeoutRef.current) {
				clearTimeout(isTouchTimeoutRef.current)
			}
			isTouchRef.current = true

			store.inputType.next("TOUCH")

			isTouchTimeoutRef.current = setTimeout(() => (isTouchRef.current = false), 500)
		}

		const handleMouseOver = () => {
			if (isTouchRef.current) {
				return
			}

			store.inputType.next("POINTER")
		}

		window.addEventListener("touchstart", handleTouchStart)
		window.addEventListener("mouseover", handleMouseOver)

		return () => {
			window.removeEventListener("touchstart", handleTouchStart)
			window.removeEventListener("mouseover", handleMouseOver)
		}
	}, [])

	React.useEffect(() => {
		return observe(`body.${IsFocusVisibleClassName}`, {
			add() {
				store.isFocusVisible.next(true)
			},
			remove() {
				store.isFocusVisible.next(false)
			},
		}).abort
	}, [])

	return null
}
