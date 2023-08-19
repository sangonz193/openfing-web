import {
	getEmailFieldErrorMessage,
	getInvalidEmailDomainFieldErrorMessage,
	getMaxLengthFieldErrorMessage,
	getMinLengthFieldErrorMessage,
	getRequiredFieldErrorMessage,
} from "../../../../formFieldErrorMessages"

export const loginFormFieldErrorMessages = {
	email: {
		email: () => getEmailFieldErrorMessage(),
		invalidDomain: () => getInvalidEmailDomainFieldErrorMessage(),
		max: (max: number) => getMaxLengthFieldErrorMessage("email", max),
		required: () => getRequiredFieldErrorMessage("email"),
	},

	password: {
		min: (min: number) => getMinLengthFieldErrorMessage("contraseña", min),
		max: (max: number) => getMaxLengthFieldErrorMessage("contraseña", max),
		required: () => getRequiredFieldErrorMessage("contraseña"),
	},
}
