import {
	getEmailFieldErrorMessage,
	getInvalidEmailDomainFieldErrorMessage,
	getMaxLengthFieldErrorMessage,
	getMinLengthFieldErrorMessage,
	getRequiredFieldErrorMessage,
	getTrimFieldErrorMessage,
} from "../../../../formFieldErrorMessages"

export const signUpFormFieldErrorMessages = {
	fname: {
		min: (min: number) => getMinLengthFieldErrorMessage("nombre", min),
		max: (max: number) => getMaxLengthFieldErrorMessage("nombre", max),
		required: () => getRequiredFieldErrorMessage("nombre"),
	},

	lname: {
		max: (max: number) => getMaxLengthFieldErrorMessage("apellido", max),
	},

	email: {
		email: () => getEmailFieldErrorMessage(),
		invalidDomain: () => getInvalidEmailDomainFieldErrorMessage(),
		max: (max: number) => getMaxLengthFieldErrorMessage("email", max),
		required: () => getRequiredFieldErrorMessage("email"),
	},

	password: {
		trim: () => getTrimFieldErrorMessage("contraseña"),
		min: (min: number) => getMinLengthFieldErrorMessage("contraseña", min),
		max: (max: number) => getMaxLengthFieldErrorMessage("contraseña", max),
		required: () => getRequiredFieldErrorMessage("contraseña"),
	},

	confirmPassword: {
		required: () => getRequiredFieldErrorMessage("confirmar contraseña"),
		notEqualToPassword: () => `Las contraseñas no coinciden`,
	},
}
