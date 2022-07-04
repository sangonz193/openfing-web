import React from "react"
import * as yup from "yup"

import { signUpFormFieldErrorMessages } from "./signUpFormFieldErrorMessages"

export type SignUpFormValues = {
	firstName: string
	lastName?: string
	email: string
	password: string
	confirmPassword: string
}

export function useSignUpFormValidationSchema() {
	return React.useMemo(() => {
		return yup.object().shape<yup.SchemaOf<SignUpFormValues>["fields"]>({
			firstName: yup
				.string()
				.required(signUpFormFieldErrorMessages.fname.required())
				.max(100, ({ max }) => signUpFormFieldErrorMessages.fname.max(max))
				.trim(),
			lastName: yup
				.string()
				.max(100, ({ max }) => signUpFormFieldErrorMessages.lname.max(max))
				.notRequired()
				.trim(),
			email: yup
				.string()
				.required(signUpFormFieldErrorMessages.email.required())
				.email(signUpFormFieldErrorMessages.email.email())
				.trim(),
			password: yup
				.string()
				.required(signUpFormFieldErrorMessages.password.required())
				.min(6, ({ min }) => signUpFormFieldErrorMessages.password.min(min))
				.trim(signUpFormFieldErrorMessages.password.trim())
				.strict(),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref("password")], signUpFormFieldErrorMessages.confirmPassword.notEqualToPassword())
				.required(signUpFormFieldErrorMessages.confirmPassword.required()),
		})
	}, [])
}
