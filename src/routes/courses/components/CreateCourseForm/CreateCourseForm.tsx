import type { IDropdownOption } from "@fluentui/react"
import { PrimaryButton, Stack } from "@fluentui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import type { SafeOmit } from "@sangonz193/utils/SafeOmit"
import { identity } from "lodash"
import React, { useCallback } from "react"
import type { SubmitHandler } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"

import type { CreateCourseInputVisibility } from "../../../../graphql/remoteSchema.types"
import { useDropdownControllerProps } from "../../../../useComponentProps/useDropdownControllerProps"
import { useTextFieldControllerProps } from "../../../../useComponentProps/useTextFieldControllerProps"
import { useCreateCourseMutation } from "./CreateCourseForm.urqlGraphql.generated"
import { useCreateCourseFormStyles } from "./useCreateCourseFormStyles"

export type CreateCourseFormProps = {
	children?: undefined
	className?: string

	onClose?: () => void
}

const CreateCourseFormComponent: React.FC<CreateCourseFormProps> = ({ className, onClose }) => {
	const styles = useCreateCourseFormStyles({
		className,
	})

	type FormValues = {
		code: string
		name: string
		eva?: string
		visibility: CreateCourseInputVisibility
	}

	const validationSchema = React.useMemo(() => {
		return yup.object().shape<yup.SchemaOf<FormValues>["fields"]>({
			name: yup.string().required("El campo nombre es requerido."),
			code: yup.string().required("El campo código es requerido."),
			eva: yup.string().notRequired(),
			visibility: yup.mixed().oneOf<CreateCourseInputVisibility>(
				dangerousKeysOf(
					identity<Record<CreateCourseInputVisibility, 0>>({
						DISABLED: 0,
						HIDDEN: 0,
						PUBLIC: 0,
					})
				)
			),
		})
	}, [])

	const [{ data }, createCourse] = useCreateCourseMutation()

	const formResolver = React.useMemo(() => yupResolver(validationSchema), [validationSchema])
	const { handleSubmit, control } = useForm<FormValues>({ resolver: formResolver, mode: "onTouched" })
	const handleValidSubmit = useCallback<SubmitHandler<FormValues>>((data) => {
		createCourse({
			input: {
				name: data.name,
				code: data.code,
				eva: data.eva,
				visibility: data.visibility,
			},
		})
	}, [])

	React.useEffect(() => {
		if (data?.createCourse_v2.__typename === "CreateCoursePayload") {
			onClose?.()
		}
	}, [data])

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleValidSubmit)} noValidate>
			<Stack tokens={{ childrenGap: 10 }}>
				<Controller
					{...useTextFieldControllerProps({
						name: "name",
						control: control,
						textFieldProps: { label: "Nombre" },
						validationSchema: validationSchema,
					})}
				/>
				<Controller
					{...useTextFieldControllerProps({
						name: "code",
						control: control,
						textFieldProps: { label: "Código" },
						validationSchema: validationSchema,
					})}
				/>
				<Controller
					{...useTextFieldControllerProps({
						name: "eva",
						control: control,
						textFieldProps: { label: "Eva" },
						validationSchema: validationSchema,
					})}
				/>

				<Controller
					{...useDropdownControllerProps({
						control: control,
						dropdownProps: {
							label: "Visibilidad",
							defaultSelectedKey: identity<CreateCourseInputVisibility>("PUBLIC"),
							options: identity<
								Array<SafeOmit<IDropdownOption, "key"> & { key: CreateCourseInputVisibility }>
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
						},
						name: "visibility",
						validationSchema: validationSchema,
					})}
				/>

				<PrimaryButton type="submit" style={{ marginTop: 20, marginLeft: "auto" }}>
					Crear
				</PrimaryButton>
			</Stack>
		</form>
	)
}

export const CreateCourseForm = React.memo(CreateCourseFormComponent)
