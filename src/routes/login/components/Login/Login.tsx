import { Stack } from "@fluentui/react"
import React from "react"

import { LoginForm } from "../LoginForm"
import { useLoginStyles } from "./useLoginStyles"

const LoginComponent: React.FC = () => {
	const styles = useLoginStyles()

	return (
		<Stack className={styles.wrapper} disableShrink>
			<LoginForm className={styles.form} />
		</Stack>
	)
}

export const Login = React.memo(LoginComponent)
