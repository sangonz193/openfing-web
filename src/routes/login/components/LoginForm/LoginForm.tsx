import { PrimaryButton, Stack } from "@fluentui/react"
import React from "react"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"

import { setFormErrorMessages } from "../../../../_utils/setFormErrorMessages"
import { FormTextField } from "../../../../components/FormTextField"
import { useYupResolver } from "../../../../hooks/useYupResolver"
import { useAuthStore } from "../../../../modules/Auth"
import { getFormErrorsFromSignInValidationErrors } from "./getFormErrorsFromSignInValidationErrors"
import type { SignInMutationVariables } from "./LoginForm.graphql.generated"
import { useSignInMutation } from "./LoginForm.graphql.generated"
import { useLoginFormStyles } from "./useLoginFormStyles"
import type { LoginFormValues } from "./useLoginFormValidationSchema"
import { useLoginFormValidationSchema } from "./useLoginFormValidationSchema"

export type LoginFormProps = {
	children?: undefined
	className?: string
}

const LoginFormComponent: React.FC<LoginFormProps> = ({ className }) => {
	const validationSchema = useLoginFormValidationSchema()
	const formResolver = useYupResolver(validationSchema)
	const { handleSubmit, control, reset, setError } = useForm<LoginFormValues>({
		resolver: formResolver,
		mode: "onTouched",
	})
	const [signIn, { loading }] = useSignInMutation()
	const authStore = useAuthStore()

	const handleValidSubmit = React.useCallback<SubmitHandler<LoginFormValues>>(async (formData) => {
		try {
			const { data, errors } = await signIn({
				variables: getVariablesFromFormData(formData),
			})

			if (errors) {
				throw errors
			}

			if (data?.signIn.__typename === "SignInPayload") {
				authStore.data(data.signIn)
			}

			if (!data?.signIn) {
				reset()
				alert(
					"Registro exitoso. Siga las instrucciones enviadas a su correo electrónico para verificar su cuenta."
				)
			} else {
				if (data.signIn.__typename === "SignInValidationErrors") {
					const anyErrorSet = setFormErrorMessages(
						{ secret: undefined, ...getFormErrorsFromSignInValidationErrors(data.signIn) },
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

	const styles = useLoginFormStyles({
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

				<FormTextField {...formFieldProps} name="email" textFieldProps={{ label: "Email", type: "email" }} />

				<FormTextField
					{...formFieldProps}
					name="password"
					textFieldProps={{ label: "Contraseña", type: "password" }}
				/>

				<PrimaryButton disabled={loading} type="submit" style={{ marginTop: 20, marginLeft: "auto" }}>
					Iniciar sesión
				</PrimaryButton>
			</Stack>
		</form>
	)
}

export const LoginForm = React.memo(LoginFormComponent)

function getVariablesFromFormData(values: LoginFormValues): SignInMutationVariables {
	return {
		secret: values.secret,
		input: {
			email: values.email,
			password: values.password,
		},
	}
}
