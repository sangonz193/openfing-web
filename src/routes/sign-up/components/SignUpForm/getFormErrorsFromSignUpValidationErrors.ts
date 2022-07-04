import type { SafeOmit } from "@sangonz193/utils"

import type { SignUpValidationErrorsFragmentFragment } from "./SignUpForm.urqlGraphql.generated"
import { signUpFormFieldErrorMessages } from "./signUpFormFieldErrorMessages"
import type { SignUpFormValues } from "./useSignUpFormValidationSchema"

export function getFormErrorsFromSignUpValidationErrors(validationErrors: SignUpValidationErrorsFragmentFragment) {
	const fieldErrors: Record<keyof SafeOmit<SignUpFormValues, "confirmPassword">, string | undefined> = {
		email: getEmailFieldErrorMessage(validationErrors),
		firstName: getFirstNameFieldErrorMessage(validationErrors),
		lastName: getLastNameFieldErrorMessage(validationErrors),
		password: getPasswordFieldErrorMessage(validationErrors),
	}

	return fieldErrors
}

const getEmailFieldErrorMessage = (validationErrors: SignUpValidationErrorsFragmentFragment) => {
	const fieldErrors = validationErrors.email
	if (!fieldErrors?.length) {
		return undefined
	}
	const firstError = fieldErrors[0]

	switch (firstError.__typename) {
		case "InvalidFormatError": {
			return signUpFormFieldErrorMessages.email.email()
		}
		case "RequiredFieldError": {
			return signUpFormFieldErrorMessages.email.required()
		}
		case "MaxLengthError": {
			return signUpFormFieldErrorMessages.email.max(firstError.max)
		}
		case "InvalidEmailDomainError": {
			return signUpFormFieldErrorMessages.email.invalidDomain()
		}
	}
}

const getFirstNameFieldErrorMessage = (validationErrors: SignUpValidationErrorsFragmentFragment) => {
	const fieldErrors = validationErrors.firstName
	if (!fieldErrors?.length) {
		return undefined
	}
	const firstError = fieldErrors[0]

	switch (firstError.__typename) {
		case "RequiredFieldError": {
			return signUpFormFieldErrorMessages.fname.required()
		}
		case "MaxLengthError": {
			return signUpFormFieldErrorMessages.fname.max(firstError.max)
		}
		case "MinLengthError": {
			return signUpFormFieldErrorMessages.fname.min(firstError.min)
		}
	}
}

const getLastNameFieldErrorMessage = (validationErrors: SignUpValidationErrorsFragmentFragment) => {
	const fieldErrors = validationErrors.lastName
	if (!fieldErrors?.length) {
		return undefined
	}
	const firstError = fieldErrors[0]

	switch (firstError.__typename) {
		case "MaxLengthError": {
			return signUpFormFieldErrorMessages.lname.max(firstError.max)
		}
	}
}

const getPasswordFieldErrorMessage = (validationErrors: SignUpValidationErrorsFragmentFragment) => {
	const fieldErrors = validationErrors.password
	if (!fieldErrors?.length) {
		return undefined
	}
	const firstError = fieldErrors[0]

	switch (firstError.__typename) {
		case "MaxLengthError": {
			return signUpFormFieldErrorMessages.password.max(firstError.max)
		}
		case "MinLengthError": {
			return signUpFormFieldErrorMessages.password.max(firstError.min)
		}
		case "RequiredFieldError": {
			return signUpFormFieldErrorMessages.password.required()
		}
	}
}
