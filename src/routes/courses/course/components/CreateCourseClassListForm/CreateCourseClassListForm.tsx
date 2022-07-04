import { PrimaryButton, Stack } from "@fluentui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import identity from "lodash/identity"
import React from "react"
import type { SubmitHandler } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"

import type { CreateCourseClassListInputVisibility } from "../../../../../graphql/remoteSchema.types"
import { useHistory } from "../../../../../modules/Navigation/useHistory"
import { useCheckboxControllerProps } from "../../../../../useComponentProps/useCheckboxControllerProps"
import { useDropdownControllerProps } from "../../../../../useComponentProps/useDropdownControllerProps"
import { useTextFieldControllerProps } from "../../../../../useComponentProps/useTextFieldControllerProps"
import { courseRouteConfig } from "../../course.route.config"
import { useCreateCourseClassListMutation } from "./CreateCourseClassListForm.urqlGraphql.generated"
import { useCreateCourseClassListFormStyles } from "./useCreateCourseClassListFormStyles"

export type CreateCourseClassListFormProps = {
	children?: undefined
	className?: string
	courseCode: string
	courseId: string
	onClose: () => void
}

const CreateCourseClassListFormComponent: React.FC<CreateCourseClassListFormProps> = ({
	className,
	courseCode,
	onClose,
}) => {
	const styles = useCreateCourseClassListFormStyles({
		className,
	})
	const [{ fetching, data }, createCourseClassListMutation] = useCreateCourseClassListMutation()

	type FormValues = {
		code: string
		name: string
		oddSemester: boolean
		year: number
		visibility: CreateCourseClassListInputVisibility
	}

	const minYear = 2000
	const maxYear = 2030

	const validationSchema = React.useMemo(
		() =>
			yup.object<yup.SchemaOf<FormValues>["fields"]>({
				code: yup
					.string()
					.required("El campo código es requerido.")
					.max(20, ({ max }) => `El código no puede exceder los ${max} caracteres.`),
				name: yup
					.string()
					.required("El campo código es requerido.")
					.max(200, ({ max }) => `El nombre no puede exceder los ${max} caracteres.`),
				oddSemester: yup.boolean().default(false),
				year: yup
					.number()
					.typeError(({ originalValue }) =>
						typeof originalValue === "string" && originalValue.length > 0
							? `El campo año debe ser un numero entre ${minYear} y ${maxYear}`
							: "El campo año es requerido."
					)
					.required("El campo año es requerido.")
					.min(minYear, `El campo año no puede ser menor que ${minYear}.`)
					.max(maxYear, `El campo año no puede ser mayor que ${maxYear}.`),
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
			if (fetching) {
				return
			}

			createCourseClassListMutation({
				input: {
					code: data.code,
					courseCode: courseCode,
					name: data.name,
					semester: data.oddSemester ? 1 : 2,
					year: data.year,
					visibility: data.visibility,
				},
			})
		},
		[fetching]
	)

	const history = useHistory()
	React.useEffect(() => {
		if (data?.createCourseClassList_v2.__typename === "CreateCourseClassListPayload") {
			onClose?.()

			if (data.createCourseClassList_v2.courseClassList.courseEdition?.courseClassLists.length === 1) {
				history.replace(
					courseRouteConfig.path({
						code: data.createCourseClassList_v2.courseClassList.code,
					})
				)
			}
		}
	}, [data])

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleValidSubmit)} noValidate>
			<Stack tokens={{ childrenGap: 10 }}>
				<Controller
					{...useTextFieldControllerProps({
						name: "name",
						controllerProps: { defaultValue: "" },
						control: control,
						textFieldProps: { label: "Nombre" },
						validationSchema: validationSchema,
					})}
				/>
				<Controller
					{...useTextFieldControllerProps({
						name: "code",
						controllerProps: { defaultValue: "" },
						control: control,
						textFieldProps: { label: "Código" },
						validationSchema: validationSchema,
					})}
				/>
				<Controller
					{...useTextFieldControllerProps({
						name: "year",
						controllerProps: { defaultValue: new Date().getFullYear() },
						control: control,
						textFieldProps: { label: "Año" },
						validationSchema: validationSchema,
					})}
				/>

				<Stack.Item>
					<Controller
						{...useCheckboxControllerProps({
							control: control,
							checkboxProps: {
								label: "Semestre impar",
								styles: { root: { marginTop: 10 } },
							},
							validationSchema: validationSchema,
							name: "oddSemester",
						})}
					/>
				</Stack.Item>

				<Controller
					{...useDropdownControllerProps({
						control: control,
						dropdownProps: {
							label: "Visibilidad",
							defaultSelectedKey: identity<CreateCourseClassListInputVisibility>("PUBLIC"),
							options: [
								{
									key: identity<CreateCourseClassListInputVisibility>("PUBLIC"),
									text: "Público",
								},
								{
									key: identity<CreateCourseClassListInputVisibility>("HIDDEN"),
									text: "Oculto",
								},
								{
									key: identity<CreateCourseClassListInputVisibility>("DISABLED"),
									text: "Deshabilitado",
								},
							],
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

export const CreateCourseClassListForm = React.memo(CreateCourseClassListFormComponent)
