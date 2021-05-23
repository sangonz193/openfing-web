import { Text } from "@fluentui/react"
import React from "react"

import { Container } from "../Container"
import { useHeaderStyles } from "./useHeaderStyles"

export type HeaderProps = {
	children?: undefined
	className?: string
	title?: string | React.ReactNode
	right?: React.ReactNode
	left?: React.ReactNode
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
		<Container className={styles.wrapper}>
			{left}
			{typeof title === "string" ? <TextH1 className={styles.title}>{title}</TextH1> : title}
			{right}
		</Container>
	)
}

export const Header = React.memo(HeaderComponent)
