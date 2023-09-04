import { getUuid } from "@sangonz193/utils"
import type { ComponentProps, PropsWithChildren } from "react"
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

import type { Header } from "./header"

export type LayoutOptions = {
	className?: string
	headerTitle?: ComponentProps<typeof Header>["title"]
	headerRight?: ComponentProps<typeof Header>["right"]
	headerLeft?: ComponentProps<typeof Header>["left"]
	showHeader?: boolean
	showNavBar?: boolean
}

type LayoutContext = {
	overrides: Array<{ key: string; options: LayoutOptions }>
	setOptions(key: string, options: LayoutOptions): void
	removeOptions(key: string): void
}

const Context = createContext(null as unknown as LayoutContext)

export function LayoutProvider(props: PropsWithChildren<{}>) {
	const { children } = props
	const [overrides, setOverrides] = useState<LayoutContext["overrides"]>([])
	const [pendingOverrides, setPendingOverrides] = useState<LayoutContext["overrides"]>([])

	const context = useMemo(() => {
		return {
			overrides,
			setOptions(key, options) {
				setPendingOverrides((prev) => {
					const index = prev.findIndex((override) => override.key === key)

					if (index === -1) {
						return [...prev, { key, options }]
					}

					return [...prev.slice(0, index), { key, options }, ...prev.slice(index + 1)]
				})
			},
			removeOptions(key) {
				setOverrides((prev) => prev.filter((override) => override.key !== key))
			},
		} satisfies LayoutContext
	}, [overrides])

	useEffect(() => {
		if (pendingOverrides.length === 0) {
			return
		}

		setOverrides((prev) => {
			const newOverrides = [...prev]

			pendingOverrides
				.slice()
				.reverse()
				.forEach((pendingOverride) => {
					const index = newOverrides.findIndex((override) => override.key === pendingOverride.key)

					if (index === -1) {
						newOverrides.push(pendingOverride)
					} else {
						newOverrides[index] = pendingOverride
					}
				})

			return newOverrides
		})
		setPendingOverrides([])
	}, [pendingOverrides])

	return <Context.Provider value={context}>{children}</Context.Provider>
}

export function useLayoutContext() {
	return useContext(Context)
}

export function useLayoutOptions(options: Partial<LayoutOptions>) {
	const [key] = useState(() => getUuid())
	const context = useLayoutContext()
	const removeOptionsTimeoutRef = useRef<NodeJS.Timeout & number>()

	useLayoutEffect(() => {
		clearTimeout(removeOptionsTimeoutRef.current)
		context.setOptions(key, options)

		return () => {
			removeOptionsTimeoutRef.current = setTimeout(() => {
				context.removeOptions(key)
			}) as NodeJS.Timeout & number
		}
	}, Object.values(options))
}
