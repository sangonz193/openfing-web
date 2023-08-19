import type { IDropdownOption } from "@fluentui/react"
import { PrimaryButton, Stack } from "@fluentui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import type { SafeOmit } from "@sangonz193/utils/SafeOmit"
import identity from "lodash/identity"
import React from "react"
import type { DefaultValues } from "react-hook-form"
import { Controller } from "react-hook-form"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { useDatePickerControllerProps } from "../../../../../fluentui/useDatePickerControllerProps"
import { useDropdownControllerProps } from "../../../../../fluentui/useDropdownControllerProps"
import { useTextFieldControllerProps } from "../../../../../fluentui/useTextFieldControllerProps"
import type {
	CreateCourseClassInputVisibility,
	CreateCourseClassListInputVisibility,
} from "../../../../../graphql/remoteSchema.types"
import { useCreateUpdateCourseClassFormStyles } from "./useCreateUpdateCourseClassFormStyles"

export type CreateUpdateCourseClassFormValues = {
	name?: string
	number: number
	visibility: CreateCourseClassInputVisibility
	publishedAt: Date
}

export type CreateUpdateCourseClassFormProps = {
	children?: undefined
	className?: string
	defaultValues?: DefaultValues<CreateUpdateCourseClassFormValues>
	onSubmit: (values: CreateUpdateCourseClassFormValues) => void
}

const CreateUpdateCourseClassFormComponent: React.FC<CreateUpdateCourseClassFormProps> = ({
	className,
	defaultValues,
	onSubmit,
}) => {
	const styles = useCreateUpdateCourseClassFormStyles({
		className,
	})

	const validationSchema = React.useMemo(
		() =>
			yup.object<yup.SchemaOf<CreateUpdateCourseClassFormValues>["fields"]>({
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

				publishedAt: yup.date().required("La fecha de publicación es requerida.") as any,
			}),
		[]
	)
	const formResolver = React.useMemo(() => yupResolver(validationSchema), [validationSchema])
	const { control, handleSubmit } = useForm<CreateUpdateCourseClassFormValues>({
		resolver: formResolver,
		mode: "onTouched",
		defaultValues: defaultValues,
	})

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)} noValidate>
			<Stack tokens={{ childrenGap: 10 }}>
				<Controller
					{...useTextFieldControllerProps({
						name: "name",
						controllerProps: { defaultValue: "" },
						control: control,
						textFieldProps: { label: "Título" },
						validationSchema: validationSchema,
					})}
				/>

				<Controller
					{...useTextFieldControllerProps({
						name: "number",
						controllerProps: { defaultValue: 1 },
						control: control,
						textFieldProps: { label: "Número" },
						validationSchema: validationSchema,
					})}
				/>

				<Controller
					{...useDatePickerControllerProps({
						name: "publishedAt",
						controllerProps: { defaultValue: new Date() },
						control: control,
						datePickerProps: { label: "Fecha de publicación" },
						validationSchema: validationSchema,
					})}
				/>

				<Controller
					{...useDropdownControllerProps({
						control: control,
						dropdownProps: {
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

export const CreateUpdateCourseClassForm = React.memo(CreateUpdateCourseClassFormComponent)
