import type { SignInValidationErrorsFragmentFragment } from "./LoginForm.urqlGraphql.generated"
import { loginFormFieldErrorMessages } from "./loginFormFieldErrorMessages"
import type { LoginFormValues } from "./useLoginFormValidationSchema"

export function getFormErrorsFromSignInValidationErrors(validationErrors: SignInValidationErrorsFragmentFragment) {
	const fieldErrors: Record<keyof LoginFormValues, string | undefined> = {
		email: getEmailFieldErrorMessage(validationErrors),
		password: getPasswordFieldErrorMessage(validationErrors),
	}

	return fieldErrors
}

const getEmailFieldErrorMessage = (validationErrors: SignInValidationErrorsFragmentFragment) => {
	const fieldErrors = validationErrors.email
	if (!fieldErrors?.length) {
		return undefined
	}
	const firstError = fieldErrors[0]

	switch (firstError.__typename) {
		case "InvalidFormatError": {
			return loginFormFieldErrorMessages.email.email()
		}
		case "RequiredFieldError": {
			return loginFormFieldErrorMessages.email.required()
		}
	}
}

const getPasswordFieldErrorMessage = (validationErrors: SignInValidationErrorsFragmentFragment) => {
	const fieldErrors = validationErrors.password
	if (!fieldErrors?.length) {
		return undefined
	}
	const firstError = fieldErrors[0]

	switch (firstError.__typename) {
		case "RequiredFieldError": {
			return loginFormFieldErrorMessages.password.required()
		}
	}
}
