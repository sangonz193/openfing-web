import type { ITextFieldProps } from "@fluentui/react"
import { DefaultButton } from "@fluentui/react"
import { PrimaryButton, Stack } from "@fluentui/react"
import keyboardKey from "keyboard-key"
import React, { useCallback } from "react"
import type { SubmitHandler } from "react-hook-form"
import { Controller } from "react-hook-form"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useAuthStore } from "../../../../auth"
import { useTextFieldControllerProps } from "../../../../fluentui/useTextFieldControllerProps"
import { setFormErrorMessages } from "../../../../form/setFormErrorMessages"
import { useYupResolver } from "../../../../hooks/useYupResolver"
import { useRootEventListener } from "../../../../rootEventListeners"
import { getFormErrorsFromSignInValidationErrors } from "./getFormErrorsFromSignInValidationErrors"
import type { SignInMutationVariables } from "./LoginForm.urqlGraphql.generated"
import { useSignInMutation } from "./LoginForm.urqlGraphql.generated"
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
		defaultValues: {
			email: "",
			password: "",
		},
	})
	const [{ fetching }, signIn] = useSignInMutation()
	const authStore = useAuthStore()

	const handleValidSubmit = React.useCallback<SubmitHandler<LoginFormValues>>(async (formData) => {
		try {
			const { data, error } = await signIn(getVariablesFromFormData(formData))

			if (error) {
				throw error
			}

			switch (data?.signIn.__typename) {
				case "SignInPayload": {
					const { grant } = data.signIn
					authStore.grant.next({
						refreshToken: grant.refreshToken,
						token: grant.token,
					})
					reset()
					break
				}

				case "EmailNotValidatedError": {
					alert("Debe validar su email antes para poder iniciar sesión.")
					break
				}

				case "SignInValidationErrors": {
					const anyErrorSet = setFormErrorMessages(
						{ ...getFormErrorsFromSignInValidationErrors(data.signIn) },
						setError
					)

					if (anyErrorSet) {
						return
					}

					alert("Ha ocurrido un error. Verifique si los campos son correctos e inténtelo de nuevo.")
					break
				}

				case "AuthenticationError": {
					alert("Debe validar su email para poder iniciar sesión.")
					break
				}

				case "GenericError":
				case undefined: {
					alert("Ha ocurrido un error inesperado.")
					break
				}
			}
		} catch {
			alert("Ha ocurrido un error inesperado.")
		}
	}, [])

	const navigate = useNavigate()
	const handleCancel = useCallback(() => {
		navigate(-1)
	}, [])
	useRootEventListener(
		"onKeyDown",
		useCallback((event) => {
			if (event.defaultPrevented) {
				return
			}

			if (keyboardKey.getCode(event.key) === keyboardKey.Escape) {
				handleCancel()
				event.preventDefault()
			}
		}, [])
	)

	const styles = useLoginFormStyles({
		className,
	})

	const renderTextField = (name: keyof LoginFormValues, textFieldProps: ITextFieldProps) => (
		<Controller
			{...useTextFieldControllerProps({
				control,
				validationSchema,
				name: name,
				textFieldProps: textFieldProps,
			})}
		/>
	)

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleValidSubmit)} noValidate>
			<Stack tokens={{ childrenGap: 10 }}>
				{renderTextField("email", { label: "Email", type: "email" })}
				{renderTextField("password", { label: "Contraseña", type: "password" })}

				<Stack horizontal horizontalAlign="end">
					<DefaultButton disabled={fetching} style={{ marginTop: 20 }} onClick={handleCancel}>
						Cancelar
					</DefaultButton>

					<div style={{ width: 20 }} />

					<PrimaryButton disabled={fetching} type="submit" style={{ marginTop: 20 }}>
						Iniciar sesión
					</PrimaryButton>
				</Stack>
			</Stack>
		</form>
	)
}

export const LoginForm = React.memo(LoginFormComponent)

function getVariablesFromFormData(values: LoginFormValues): SignInMutationVariables {
	return {
		input: {
			email: values.email,
			password: values.password,
		},
	}
}
