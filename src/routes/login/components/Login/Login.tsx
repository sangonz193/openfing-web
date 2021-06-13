import React from "react"

import { useRedirectToHomeIfAuthenticated } from "../../../../hooks/useRedirectToHomeIfAuthenticated"
import { useScreenTitle } from "../../../../hooks/useScreenTitle"
import { LoginForm } from "../LoginForm"
import { useLoginStyles } from "./useLoginStyles"

export type LoginProps = {
	children?: undefined
	className?: string
}

const LoginComponent: React.FC<LoginProps> = ({ className }) => {
	useRedirectToHomeIfAuthenticated()
	useScreenTitle("Inicio de sesión")

	const styles = useLoginStyles({
		className,
	})

	return (
		<div className={styles.wrapper}>
			<LoginForm />
		</div>
	)
}

export const Login = React.memo(LoginComponent)
