import React from "react"

import { useGoogleAnalyticsPageView } from "../../../../googleAnalytics/useGoogleAnalyticsPageView"
import { useScreenTitle } from "../../../../hooks/useScreenTitle"
import { SignUpForm } from "../SignUpForm"
import { useSignUpStyles } from "./useSignUpStyles"

export type SignUpProps = {
	children?: undefined
	className?: string
}

const SignUpComponent: React.FC<SignUpProps> = ({ className }) => {
	const title = "Registro"
	useScreenTitle(title)
	useGoogleAnalyticsPageView({ title: title })
	const styles = useSignUpStyles({
		className,
	})

	return (
		<div className={styles.wrapper}>
			<SignUpForm />
		</div>
	)
}

export const SignUp = React.memo(SignUpComponent)
