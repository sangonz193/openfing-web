import type { IDropdownOption } from "@fluentui/react"
import { PrimaryButton, Stack } from "@fluentui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import type { SafeOmit } from "@sangonz193/utils/SafeOmit"
import identity from "lodash/identity"
import React from "react"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { FormDropdown } from "../../../../../components/FormDropdown/FormDropdown"
import { FormTextField } from "../../../../../components/FormTextField/FormTextField"
import type {
	CreateCourseClassInputVisibility,
	CreateCourseClassListInputVisibility,
} from "../../../../../graphql/remoteSchema.types"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useAuthStore } from "../../../../../modules/Auth"
import { useCreateCourseClassMutation } from "./CreateCourseClassForm.graphql.generated"
import { useCreateCourseClassFormStyles } from "./useCreateCourseClassFormStyles"

export type CreateCourseClassFormProps = {
	children?: undefined
	className?: string
	courseClassListCode: string
	onClose: () => void
}

const CreateCourseClassFormComponent: React.FC<CreateCourseClassFormProps> = ({
	className,
	courseClassListCode,
	onClose,
}) => {
	const styles = useCreateCourseClassFormStyles({
		className,
	})
	const { secret } = useReactiveVars(useAuthStore(), ["secret"]) // TODO: get isAdmin condition

	const [createCourseClassMutation, { loading, data }] = useCreateCourseClassMutation()

	type FormValues = {
		name?: string
		number: number
		visibility: CreateCourseClassInputVisibility
	}

	const validationSchema = React.useMemo(
		() =>
			yup.object<yup.SchemaOf<FormValues>["fields"]>({
				number: yup.number().positive("Debe ser positivo").integer("Debe ser un numero entero").required(),

				name: yup
					.string()
					.trim()
					.notRequired()
					.max(200, ({ max }) => `El título no puede exceder los ${max} caracteres.`),

				visibility: yup.mixed().oneOf<CreateCourseClassListInputVisibility>(
					dangerousKeysOf(
						identity<Record<CreateCourseClassListInputVisibility, 0>>({
							DISABLED: 0,
							HIDDEN: 0,
							PUBLIC: 0,
						})
					)
				),
			}),
		[]
	)
	const formResolver = React.useMemo(() => yupResolver(validationSchema), [validationSchema])
	const { control, handleSubmit } = useForm<FormValues>({
		resolver: formResolver,
		mode: "onTouched",
	})

	const handleValidSubmit = React.useCallback<SubmitHandler<FormValues>>(
		(data) => {
			if (!secret || loading) {
				return
			}

			createCourseClassMutation({
				variables: {
					input: {
						courseClassListRef: {
							byCode: {
								code: courseClassListCode,
							},
						},
						name: data.name ?? `Clase ${data.number}`,
						number: data.number,
						visibility: data.visibility,
					},
					secret: secret,
				},
			})
		},
		[loading]
	)

	React.useEffect(() => {
		if (data?.createCourseClass.__typename === "CreateCourseClassPayload") {
			onClose?.()
		}
	}, [data])

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleValidSubmit)} noValidate>
			<Stack tokens={{ childrenGap: 10 }}>
				<FormTextField
					name="name"
					controllerProps={{ defaultValue: "" }}
					control={control}
					textFieldProps={{ label: "Título" }}
					validationSchema={validationSchema}
				/>

				<FormTextField
					name="number"
					controllerProps={{ defaultValue: "1" }}
					control={control}
					textFieldProps={{ label: "Número" }}
					validationSchema={validationSchema}
				/>

				<FormDropdown
					control={control}
					dropdownProps={{
						label: "Visibilidad",
						defaultSelectedKey: identity<CreateCourseClassListInputVisibility>("PUBLIC"),
						options: identity<
							Array<SafeOmit<IDropdownOption, "key"> & { key: CreateCourseClassListInputVisibility }>
						>([
							{
								key: "PUBLIC",
								text: "Público",
							},
							{
								key: "HIDDEN",
								text: "Oculto",
							},
							{
								key: "DISABLED",
								text: "Deshabilitado",
							},
						]),
					}}
					name="visibility"
					validationSchema={validationSchema}
				/>

				<PrimaryButton type="submit" style={{ marginTop: 20, marginLeft: "auto" }}>
					Crear
				</PrimaryButton>
			</Stack>
		</form>
	)
}

export const CreateCourseClassForm = React.memo(CreateCourseClassFormComponent)
