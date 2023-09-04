import type { ComponentType } from "react"
import React from "react"

import { cn } from "@/lib/cn"

type Props = {
	className?: string
	title?: string | ComponentType<{}>
	right?: ComponentType<{}>
	left?: ComponentType<{}>
}

export function Header({ className, title = "", right, left }: Props) {
	return (
		<div className={cn("flex h-14 items-center", className)}>
			{left && React.createElement(left)}
			{typeof title === "string" ? (
				<h1 className="ml-4 mr-auto shrink overflow-auto whitespace-nowrap pl-1 pr-5 text-2xl font-bold md:ml-2">
					{title}
				</h1>
			) : (
				title && React.createElement(title)
			)}
			{right && React.createElement(right)}
		</div>
	)
}
