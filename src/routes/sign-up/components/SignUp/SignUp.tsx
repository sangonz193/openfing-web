import React from "react"

import { SignUpForm } from "../SignUpForm"
import { useSignUpStyles } from "./useSignUpStyles"

const SignUpComponent: React.FC = () => {
	const styles = useSignUpStyles()

	return (
		<div className={styles.wrapper}>
			<SignUpForm />
		</div>
	)
}

export const SignUp = React.memo(SignUpComponent)
