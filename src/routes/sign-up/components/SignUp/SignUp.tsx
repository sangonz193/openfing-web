import React from "react"

import { useSignUpStyles } from "./useSignUpStyles"

export type SignUpProps = {
	children?: undefined
	className?: string
}

const SignUpComponent: React.FC<SignUpProps> = ({ className }) => {
	const styles = useSignUpStyles({
		className,
	})

	return <div className={styles.wrapper}></div>
}

export const SignUp = React.memo(SignUpComponent)
