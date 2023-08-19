import { FontIcon, Link, Stack } from "@fluentui/react"
import React from "react"

import { useLocalLinkProps } from "../../hooks/useLocalLinkProps"
import { useMatchPath } from "../../navigation"
import { useLocation } from "../../navigation/useLocation"
import { useNavbarButtonStyles } from "./useNavbarButtonStyles"

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

	const styles = useNavbarButtonStyles({
		className,
		active,
	})

	return (
		<Link
			{...useLocalLinkProps({
				className: styles.wrapper,
				title: routeName,
				href: route,
			})}
		>
			{active && <Stack className={styles.activeIndicator} />}
			<FontIcon iconName={active ? activeIconName : iconName} className={styles.icon} />
		</Link>
	)
}

export const NavbarButton = React.memo(NavbarButtonComponent)
