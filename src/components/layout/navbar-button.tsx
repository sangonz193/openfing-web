import type { HomeIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"
import { Link, useLocation } from "react-router-dom"

import { cn } from "@/lib/cn"

type Props = {
	to: string
	exact?: boolean
	label: string
	Icon: typeof HomeIcon
	SolidIcon: typeof HomeIcon
	className?: string
}

export function NavbarButton(props: Props) {
	const { to, exact, label, className } = props

	const location = useLocation()
	const active = useMemo(
		() => location.pathname.startsWith(to) && (!exact || location.pathname === to),
		[to, exact, location.pathname]
	)
	const Icon = active ? props.SolidIcon : props.Icon

	return (
		<div className={cn("shrink-0 grow md:grow-0", className)}>
			<Link
				to={to}
				className={cn(
					"mx-auto flex h-16 w-20 grow flex-col items-center justify-center rounded-lg",
					active && "bg-card text-primary",
					!active && "hover:bg-card/50"
				)}
			>
				<Icon className="w-6" />
				<span className={cn("text-xs", active && "font-bold")}>{label}</span>
			</Link>
		</div>
	)
}
