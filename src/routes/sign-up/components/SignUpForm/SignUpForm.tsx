import { PrimaryButton, Stack } from "@fluentui/react"
import React from "react"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"

import { setFormErrorMessages } from "../../../../_utils/setFormErrorMessages"
import { FormTextField } from "../../../../components/FormTextField"
import { useYupResolver } from "../../../../hooks/useYupResolver"
import { getFormErrorsFromSignUpValidationErrors } from "./getFormErrorsFromSignUpValidationErrors"
import type { SignUpMutationVariables } from "./SignUpForm.graphql.generated"
import { useSignUpMutation } from "./SignUpForm.graphql.generated"
import { useSignUpFormStyles } from "./useSignUpFormStyles"
import type { SignUpFormValues } from "./useSignUpFormValidationSchema"
import { useSignUpFormValidationSchema } from "./useSignUpFormValidationSchema"

export type SignUpFormProps = {
	children?: undefined
	className?: string
}

const SignUpFormComponent: React.FC<SignUpFormProps> = ({ className }) => {
	const validationSchema = useSignUpFormValidationSchema()
	const formResolver = useYupResolver(validationSchema)
	const { handleSubmit, control, reset, setError } = useForm<SignUpFormValues>({
		resolver: formResolver,
		mode: "onTouched",
	})
	const [signUp, { loading }] = useSignUpMutation()

	const handleValidSubmit = React.useCallback<SubmitHandler<SignUpFormValues>>(async (formData) => {
		try {
			const { data, errors } = await signUp({
				variables: getVariablesFromFormData(formData),
			})

			if (errors) {
				throw errors
			}

			if (!data?.signUp) {
				reset()
				alert(
					"Registro exitoso. Siga las instrucciones enviadas a su correo electrónico para verificar su cuenta."
				)
			} else {
				if (data.signUp.__typename === "SignUpValidationErrors") {
					const anyErrorSet = setFormErrorMessages(
						{ secret: undefined, ...getFormErrorsFromSignUpValidationErrors(data.signUp) },
						setError
					)

					if (anyErrorSet) {
						return
					}
				}

				alert("Ha ocurrido un error. Verifique si los campos son correctos e inténtelo de nuevo.")
			}
		} catch {
			alert("Ha ocurrido un error inesperado.")
		}
	}, [])

	const styles = useSignUpFormStyles({
		className,
	})

	const formFieldProps = {
		control,
		validationSchema,
	}

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleValidSubmit)} noValidate>
			<Stack tokens={{ childrenGap: 10 }}>
				<FormTextField {...formFieldProps} name="secret" textFieldProps={{ label: "Secreto" }} />

				<FormTextField {...formFieldProps} name="fname" textFieldProps={{ label: "Nombre" }} />

				<FormTextField {...formFieldProps} name="lname" textFieldProps={{ label: "Apellido" }} />

				<FormTextField {...formFieldProps} name="email" textFieldProps={{ label: "Email", type: "email" }} />

				<FormTextField
					{...formFieldProps}
					name="password"
					textFieldProps={{ label: "Contraseña", type: "password" }}
				/>

				<PrimaryButton disabled={loading} type="submit" style={{ marginTop: 20, marginLeft: "auto" }}>
					Registrarse
				</PrimaryButton>
			</Stack>
		</form>
	)
}

export const SignUpForm = React.memo(SignUpFormComponent)

function getVariablesFromFormData(values: SignUpFormValues): SignUpMutationVariables {
	return {
		secret: values.secret,
		input: {
			firstName: values.fname,
			lastName: values.lname,
			email: values.email,
			password: values.password,
		},
	}
}
