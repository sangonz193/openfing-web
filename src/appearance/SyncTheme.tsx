import React from "react"
import { useMediaQuery } from "react-responsive"

import { useObservableStates } from "../hooks/useObservableStates"
import { applyThemeOutsideContext } from "./applyThemeOutsideContext"
import { getThemeFromKey } from "./getThemeFromKey"
import { useAppearanceStore } from "./useAppearanceStore"

export const SyncTheme: React.FC = () => {
	const store = useAppearanceStore()
	const { themeKey } = useObservableStates(store, ["themeKey"])

	const prefersDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" })
	React.useEffect(() => {
		const theme = getThemeFromKey(themeKey, { prefersDarkMode })

		let newClassName = themeKey
		if (newClassName === "auto") {
			newClassName = prefersDarkMode ? "dark" : "light"
		}

		document.body.classList.remove("auto", "black", "dark", "light")
		document.body.classList.add(newClassName)

		applyThemeOutsideContext(theme)
		store.currentTheme.next(theme)
	}, [themeKey, prefersDarkMode])

	// const [skip, setSkip] = useState(false)
	// React.useEffect(() => {
	// 	if (skip) {
	// 		return
	// 	}
	// 	const themeKeys: ThemeKey[] = dangerousKeysOf(
	// 		identity<Record<ThemeKey, 0>>({
	// 			auto: 0,
	// 			black: 0,
	// 			dark: 0,
	// 			light: 0,
	// 		})
	// 	)

	// 	let lastIndex = 0
	// 	const interval = setInterval(() => {
	// 		store.setTheme(themeKeys[lastIndex])
	// 		lastIndex = (lastIndex + 1) % themeKeys.length
	// 	}, 5000)

	// 	return () => clearInterval(interval)
	// }, [skip])

	// useRootEventListener(
	// 	"onKeyPress",
	// 	useCallback((event) => {
	// 		console.log(keyboardKey.getCode(event.key), keyboardKey.s)
	// 		if (keyboardKey.getCode(event.key) === keyboardKey.s) {
	// 			setSkip((s) => !s)
	// 		}
	// 	}, [])
	// )

	return null
}
