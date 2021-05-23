import { PrimaryButton } from "@fluentui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import React, { useCallback, useEffect, useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { Container } from "../../../../components/Container"
import { FormTextField } from "../../../../components/FormTextField/FormTextField"
import { useLayoutOptions } from "../../../../components/Layout/useLayoutOptions"
import { useUserFromSecretMutation } from "./AdminSecret.graphql.generated"
import { useAdminSecretStyles } from "./useAdminSecretStyles"

export type AdminSecretProps = {
	children?: undefined
	className?: string
	onSuccess: (secret: string) => void
}

const AdminSecretComponent: React.FC<AdminSecretProps> = ({ className, onSuccess }) => {
	const styles = useAdminSecretStyles({
		className,
	})

	useLayoutOptions({
		showHeader: false,
		showNavBar: false,
	})

	const [secret, setSecret] = useState<string>()
	const [userFromSecretMutation, { data, loading }] = useUserFromSecretMutation()

	type FormValues = {
		secret: string
	}

	const validationSchema = React.useMemo(
		() =>
			yup.object<yup.SchemaOf<FormValues>["fields"]>({
				secret: yup.string().required("Campo requerido."),
			}),
		[]
	)

	const formResolver = React.useMemo(() => yupResolver(validationSchema), [validationSchema])
	const { handleSubmit, setError, control } = useForm<FormValues>({
		resolver: formResolver,
		mode: "onTouched",
	})

	const handleValidSubmit = useCallback<SubmitHandler<FormValues>>(({ secret }) => {
		setSecret(secret)
		userFromSecretMutation({
			variables: {
				secret,
			},
		})
	}, [])

	useEffect(() => {
		if (data?.userFromSecret.__typename === "UserFromSecretPayload" && secret) {
			onSuccess(secret)
		} else if (data?.userFromSecret) {
			setError("secret", { message: "No se pudo validar el secreto." })
		}
	}, [data])

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleValidSubmit)}>
			<Container className={styles.container}>
				<Container className={styles.secretContainer}>
					<FormTextField
						name="secret"
						controllerProps={{ defaultValue: "" }}
						control={control}
						textFieldProps={{ label: "Secreto" }}
						validationSchema={validationSchema}
					/>
				</Container>

				<PrimaryButton className={styles.sendButton} type="submit" disabled={loading}>
					Enviar
				</PrimaryButton>
			</Container>
		</form>
	)
}

export const AdminSecret = React.memo(AdminSecretComponent)
