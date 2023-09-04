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
		<div className={cn("flex h-16 items-center", className)}>
			{left && React.createElement(left)}
			{typeof title === "string" ? (
				<h1 className="mr-auto text-ellipsis whitespace-nowrap px-5 text-2xl font-bold">{title}</h1>
			) : (
				title && React.createElement(title)
			)}
			{right && React.createElement(right)}
		</div>
	)
}
