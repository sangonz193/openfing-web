import type { ITextFieldProps } from "@fluentui/react"
import { PrimaryButton, Stack } from "@fluentui/react"
import React from "react"
import type { SubmitHandler } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"

import { setFormErrorMessages } from "../../../../_utils/setFormErrorMessages"
import { useYupResolver } from "../../../../hooks/useYupResolver"
import { useTextFieldControllerProps } from "../../../../useComponentProps/useTextFieldControllerProps"
import { getFormErrorsFromSignUpValidationErrors } from "./getFormErrorsFromSignUpValidationErrors"
import type { SignUpMutationVariables } from "./SignUpForm.urqlGraphql.generated"
import { useSignUpMutation } from "./SignUpForm.urqlGraphql.generated"
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
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			password: "",
		},
	})
	const [{ fetching }, signUp] = useSignUpMutation()

	const handleValidSubmit = React.useCallback<SubmitHandler<SignUpFormValues>>(async (formData) => {
		try {
			const { data, error } = await signUp(getVariablesFromFormData(formData))

			if (error) {
				throw error
			}

			if (!data?.signUp) {
				reset()
				alert("Registro exitoso. Puede iniciar sesión.")
			} else {
				if (data.signUp.__typename === "SignUpValidationErrors") {
					const anyErrorSet = setFormErrorMessages(
						{
							confirmPassword: undefined,
							...getFormErrorsFromSignUpValidationErrors(data.signUp),
						},
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

	const renderTextField = (name: keyof SignUpFormValues, textFieldProps: ITextFieldProps) => (
		<Controller
			{...useTextFieldControllerProps({
				...formFieldProps,
				name: name,
				textFieldProps: textFieldProps,
				control,
			})}
		/>
	)

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleValidSubmit)} noValidate>
			<Stack tokens={{ childrenGap: 10 }}>
				{renderTextField("firstName", { label: "Nombre" })}
				{renderTextField("lastName", { label: "Apellido" })}
				{renderTextField("email", { label: "Email", type: "email" })}
				{renderTextField("password", { label: "Contraseña", type: "password", minLength: 8, maxLength: 200 })}
				{renderTextField("confirmPassword", { label: "Confirmar contraseña", type: "password" })}

				<PrimaryButton disabled={fetching} type="submit" style={{ marginTop: 20, marginLeft: "auto" }}>
					Registrarse
				</PrimaryButton>
			</Stack>
		</form>
	)
}

export const SignUpForm = React.memo(SignUpFormComponent)

function getVariablesFromFormData(values: SignUpFormValues): SignUpMutationVariables {
	return {
		input: {
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			password: values.password,
		},
	}
}
