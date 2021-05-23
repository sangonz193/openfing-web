import React from "react"

export type LayoutOptions = {
	className?: string
	headerTitle?: string | React.ReactNode
	headerRight?: React.ReactNode
	showHeader?: boolean
}

export type SetLayoutOptions = Partial<LayoutOptions> | ((options: LayoutOptions) => Partial<LayoutOptions>)

export type LayoutContextValue = {
	setLayoutOptions: (setOptions: SetLayoutOptions) => void
}

export const LayoutContext = React.createContext<LayoutContextValue>((undefined as unknown) as LayoutContextValue)
