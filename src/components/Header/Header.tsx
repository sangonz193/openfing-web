import { Stack, Text } from "@fluentui/react"
import React from "react"

import { useHeaderStyles } from "./useHeaderStyles"

export type HeaderProps = {
	children?: undefined
	className?: string
	title?: string | React.FC<{}>
	right?: React.FC<{}>
	left?: React.FC<{}>
}

const TextH1 = Text.bind({})
TextH1.defaultProps = {
	...TextH1.defaultProps,
	as: "h1",
}

const HeaderComponent: React.FC<HeaderProps> = ({ className, title, right, left }) => {
	const styles = useHeaderStyles({
		className,
	})

	return (
		<Stack horizontal className={styles.wrapper} disableShrink>
			{left && React.createElement(left)}
			{typeof title === "string" ? (
				<Stack className={styles.titleWrapper} horizontal horizontalAlign="center">
					<TextH1 className={styles.title}>{title}</TextH1>
				</Stack>
			) : (
				title && React.createElement(title)
			)}
			{right && React.createElement(right)}
		</Stack>
	)
}

export const Header = React.memo(HeaderComponent)
