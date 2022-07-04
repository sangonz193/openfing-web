import React from "react"
import * as yup from "yup"

import { loginFormFieldErrorMessages } from "./loginFormFieldErrorMessages"

export type LoginFormValues = {
	email: string
	password: string
}

export function useLoginFormValidationSchema() {
	return React.useMemo(() => {
		return yup.object().shape<yup.SchemaOf<LoginFormValues>["fields"]>({
			email: yup.string().required(loginFormFieldErrorMessages.email.required()).trim(),
			password: yup.string().required(loginFormFieldErrorMessages.password.required()),
		})
	}, [])
}
