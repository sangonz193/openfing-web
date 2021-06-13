import React from "react"
import * as yup from "yup"

import { signUpFormFieldErrorMessages } from "./signUpFormFieldErrorMessages"

export type SignUpFormValues = {
	fname: string
	lname?: string
	email: string
	password: string
	secret: string
}

export function useSignUpFormValidationSchema() {
	return React.useMemo(() => {
		return yup.object().shape<yup.SchemaOf<SignUpFormValues>["fields"]>({
			fname: yup
				.string()
				.required(signUpFormFieldErrorMessages.fname.required())
				.max(100, ({ max }) => signUpFormFieldErrorMessages.fname.max(max))
				.trim(),
			lname: yup
				.string()
				.max(100, ({ max }) => signUpFormFieldErrorMessages.lname.max(max))
				.notRequired()
				.trim(),
			email: yup
				.string()
				.required(signUpFormFieldErrorMessages.email.required())
				.email(signUpFormFieldErrorMessages.email.email())
				.trim(),
			secret: yup.string().required(signUpFormFieldErrorMessages.secret.required()).trim(),
			password: yup
				.string()
				.required(signUpFormFieldErrorMessages.password.required())
				.min(6, ({ min }) => signUpFormFieldErrorMessages.password.min(min))
				.trim(signUpFormFieldErrorMessages.password.trim())
				.strict(),
		})
	}, [])
}
