import { FontIcon, Link } from "@fluentui/react"
import React from "react"

import { cn } from "@/lib/cn"

import { useLocalLinkProps } from "../../hooks/useLocalLinkProps"
import { useMatchPath } from "../../navigation"
import { useLocation } from "../../navigation/useLocation"

export type NavbarButtonProps = {
	children?: undefined
	className?: string
	route: string
	routeName: string
	exact?: boolean
	iconName: string
	activeIconName: string
}

const NavbarButtonComponent: React.FC<NavbarButtonProps> = ({
	className,
	route,
	routeName,
	exact,
	iconName,
	activeIconName,
}) => {
	const location = useLocation()
	const matchPath = useMatchPath(location.pathname, {
		path: route,
		exact: exact,
	})

	const active = matchPath !== null

	return (
		<Link
			{...useLocalLinkProps({
				className: cn(
					"relative flex h-12 min-w-[48px] shrink-0 grow items-center justify-center hover:bg-card-foreground/10 md:w-12 md:grow-0",
					className
				),
				title: routeName,
				href: route,
			})}
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
