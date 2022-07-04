export {}

// import {
// 	and,
// 	createSimpleValidator,
// 	email,
// 	max,
// 	merge,
// 	min,
// 	objectAsync,
// 	or,
// 	string,
// 	trim,
// 	undefinedV,
// } from "@sangonz193/ts-validation"
// import { hasProperty } from "@sangonz193/utils"
// import { isObject } from "lodash"
// import { useCallback } from "react"

// import {
// 	getMaxLengthFieldErrorMessage,
// 	getMinLengthFieldErrorMessage,
// 	getRequiredFieldErrorMessage,
// } from "../../../../modules/FormFieldErrorMessages"
// import { useValidationResolver } from "../../../../validation/useValidationResolver"

// export type SignUpFormValues = {
// 	firstName: string
// 	lastName?: string
// 	email: string
// 	password: string
// 	confirmPassword: string
// }

// const baseValidationSchema = {
// 	firstName: and(
// 		string(),
// 		merge<string>()(
// 			trim(),
// 			max<string>(100) //
// 		)
// 	),
// 	lastName: or(
// 		undefinedV(),
// 		and(
// 			string(),
// 			merge<string>()(
// 				trim(), //
// 				min<string>(10),
// 				max<string>(100)
// 			)
// 		)
// 	),
// 	email: and(
// 		string(),
// 		merge<string>()(
// 			trim(), //
// 			email(),
// 			max<string>(100)
// 		)
// 	),
// 	password: and(
// 		string(),
// 		merge<string>()(
// 			trim(), //
// 			min<string>(8),
// 			max<string>(200)
// 		)
// 	),
// 	confirmPassword: string(),
// }

// export function useSignUpFormResolver() {
// 	const getValidationSchema = useCallback(
// 		(data: unknown) =>
// 			objectAsync({
// 				...baseValidationSchema,
// 				confirmPassword: and(
// 					baseValidationSchema.confirmPassword,
// 					createSimpleValidator({
// 						validator(value) {
// 							return isObject(data) && hasProperty(data, "password") && data.password === value
// 						},

// 						error: {
// 							type: "password-mismatch" as const,
// 						},
// 					})
// 				),
// 			}),
// 		[]
// 	)

// 	return useValidationResolver(getValidationSchema, {
// 		email: (errors) => {
// 			const error = errors.shift()

// 			switch (error?.type) {
// 				case undefined: {
// 					return undefined
// 				}
// 				case "string-error": {
// 					return "El valor debe ser de tipo string"
// 				}
// 				case "min-error": {
// 					return getMinLengthFieldErrorMessage("email", error.min)
// 				}
// 				case "max-error": {
// 					return getMaxLengthFieldErrorMessage("email", error.max)
// 				}
// 			}
// 		},

// 		firstName: (errors) => {
// 			const error = errors.shift()

// 			switch (error?.type) {
// 				case undefined: {
// 					return undefined
// 				}
// 				case "string-error": {
// 					throw new Error('Not implemented yet: "string-error" case')
// 				}
// 				case "min-error": {
// 					return getMinLengthFieldErrorMessage("nombre", error.min)
// 				}
// 				case "max-error": {
// 					return getMaxLengthFieldErrorMessage("nombre", error.max)
// 				}
// 			}
// 		},

// 		lastName: (errors) => {
// 			const error = errors.shift()

// 			switch (error?.type) {
// 				case undefined: {
// 					return undefined
// 				}
// 				case "string-error": {
// 					return undefined
// 				}
// 				case "min-error": {
// 					return getMinLengthFieldErrorMessage("apellido", error.min)
// 				}
// 				case "max-error": {
// 					return getMaxLengthFieldErrorMessage("apellido", error.max)
// 				}
// 			}
// 		},

// 		password: (errors) => {
// 			const error = errors.shift()

// 			switch (error?.type) {
// 				case undefined: {
// 					return undefined
// 				}
// 				case "string-error": {
// 					return getRequiredFieldErrorMessage("contraseña")
// 				}
// 				case "min-error": {
// 					return getMinLengthFieldErrorMessage("contraseña", error.min)
// 				}
// 				case "max-error": {
// 					return getMaxLengthFieldErrorMessage("contraseña", error.max)
// 				}
// 			}
// 		},

// 		confirmPassword: (errors) => {
// 			const error = errors.shift()

// 			switch (error?.type) {
// 				case undefined: {
// 					return undefined
// 				}
// 				case "password-mismatch": {
// 					throw new Error('Not implemented yet: "password-mismatch" case')
// 				}
// 				case "string-error": {
// 					throw new Error('Not implemented yet: "string-error" case')
// 				}
// 			}
// 		},
// 	})
// }

// // export function useSignUpFormResolver() {
// // 	useYupResolver(validationSchema)
// // 	return React.useMemo(() => {
// // 		return yup.object().shape<yup.SchemaOf<SignUpFormValues>["fields"]>({
// // 			firstName: yup
// // 				.string()
// // 				.required(signUpFormFieldErrorMessages.fname.required())
// // 				.max(100, ({ max }) => signUpFormFieldErrorMessages.fname.max(max))
// // 				.trim(),
// // 			lastName: yup
// // 				.string()
// // 				.max(100, ({ max }) => signUpFormFieldErrorMessages.lname.max(max))
// // 				.notRequired()
// // 				.trim(),
// // 			email: yup
// // 				.string()
// // 				.required(signUpFormFieldErrorMessages.email.required())
// // 				.email(signUpFormFieldErrorMessages.email.email())
// // 				.trim(),
// // 			password: yup
// // 				.string()
// // 				.required(signUpFormFieldErrorMessages.password.required())
// // 				.min(6, ({ min }) => signUpFormFieldErrorMessages.password.min(min))
// // 				.trim(signUpFormFieldErrorMessages.password.trim())
// // 				.strict(),
// // 			confirmPassword: yup
// // 				.string()
// // 				.oneOf([yup.ref("password")], signUpFormFieldErrorMessages.confirmPassword.notEqualToPassword())
// // 				.required(signUpFormFieldErrorMessages.confirmPassword.required()),
// // 		})
// // 	}, [])
// // }
