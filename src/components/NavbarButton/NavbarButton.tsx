import { FontIcon } from "@fluentui/react"
import React from "react"
import type { RouteObject } from "react-router-dom"
import { Link, useMatch } from "react-router-dom"

import { cn } from "@/lib/cn"

export type NavbarButtonProps = {
	children?: undefined
	className?: string
	iconName: string
	activeIconName: string
	route: RouteObject & Required<Pick<RouteObject, "path">>
	name: string
}

const NavbarButtonComponent: React.FC<NavbarButtonProps> = (props) => {
	const { name, className, route, iconName, activeIconName } = props
	const matchPath = useMatch(route.path)
	const active = matchPath !== null

	return (
		<Link
			to={route.path}
			title={name}
			className={cn(
				"relative flex h-12 min-w-[48px] shrink-0 grow items-center justify-center hover:bg-card-foreground/10 md:w-12 md:grow-0",
				className
			)}
		>
			{active && <div className="absolute top-1.5 h-1 w-1 rounded-full bg-primary md:left-1.5 md:top-auto" />}
			<FontIcon
				iconName={active ? activeIconName : iconName}
				className={cn("text-xl text-foreground", active && "text-primary")}
			/>
		</Link>
	)
}

export const NavbarButton = React.memo(NavbarButtonComponent)
