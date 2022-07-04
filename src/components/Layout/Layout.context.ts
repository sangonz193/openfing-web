import React from "react"

import type { HeaderProps } from "../Header"

export type LayoutOptions = {
	className?: string
	headerTitle?: HeaderProps["title"]
	headerRight?: HeaderProps["right"]
	headerLeft?: HeaderProps["left"]
	showHeader?: boolean
	showNavBar?: boolean
}

export type SetLayoutOptions = Partial<LayoutOptions> | ((options: LayoutOptions) => Partial<LayoutOptions>)

export type LayoutContextValue = {
	setLayoutOptions: (setOptions: SetLayoutOptions | undefined) => void
	overriddenLayoutOptions?: SetLayoutOptions
}

export const LayoutContext = React.createContext<LayoutContextValue>(undefined as unknown as LayoutContextValue)
