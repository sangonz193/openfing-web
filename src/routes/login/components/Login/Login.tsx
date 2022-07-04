import { Stack } from "@fluentui/react"
import React from "react"

import { LoginForm } from "../LoginForm"
import { useLoginStyles } from "./useLoginStyles"

export type LoginProps = {
	children?: undefined
	className?: string
}

const LoginComponent: React.FC<LoginProps> = ({ className }) => {
	const styles = useLoginStyles({
		className,
	})

	return (
		<Stack className={styles.wrapper} disableShrink>
			<LoginForm className={styles.form} />
		</Stack>
	)
}

export const Login = React.memo(LoginComponent)
