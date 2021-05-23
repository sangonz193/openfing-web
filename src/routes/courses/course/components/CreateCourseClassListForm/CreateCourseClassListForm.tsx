import { PrimaryButton, Stack } from "@fluentui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import identity from "lodash/identity"
import React from "react"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { dangerousKeysOf } from "../../../../../_utils/dangerousKeysOf"
import { hasProperty } from "../../../../../_utils/hasProperty"
import { FormCheckbox } from "../../../../../components/FormCheckbox/FormCheckbox"
import { FormDropdown } from "../../../../../components/FormDropdown/FormDropdown"
import { FormTextField } from "../../../../../components/FormTextField/FormTextField"
import type {
	Course,
	CourseEdition,
	CreateCourseClassListInputVisibility,
} from "../../../../../graphql/remoteSchema.types"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useAppStore } from "../../../../../modules/App"
import { useCreateCourseClassListMutation } from "./CreateCourseClassListForm.graphql.generated"
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
	const { secret } = useReactiveVars(useAppStore(), ["secret"])

	const [createCourseClassListMutation, { loading, data }] = useCreateCourseClassListMutation()

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
				oddSemester: yup.boolean().required("El campo semestre es requerido."),
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
			if (!secret || loading) {
				return
			}

			createCourseClassListMutation({
				variables: {
					input: {
						code: data.code,
						courseCode: courseCode,
						name: data.name,
						semester: data.oddSemester ? 1 : 2,
						year: data.year,
						visibility: data.visibility,
					},
					secret: secret,
				},
				update: (cache, mutationResult) => {
					if (mutationResult.data?.createCourseClassList.__typename !== "CreateCourseClassListPayload") {
						return
					}

					let courseId: string | undefined
					const data = cache.extract()
					Object.keys(data).forEach((key) => {
						if (!key.startsWith("Course:")) {
							return
						}
						const value = data[key as keyof typeof data] as Record<keyof Course, unknown> | undefined

						if (
							typeof value === "object" &&
							value &&
							typeof value.id === "string" &&
							typeof value.code === "string" &&
							value.code === courseCode
						) {
							courseId = value.id
						}
					})

					const courseEditionIds: string[] = []
					if (courseId) {
						Object.keys(data).forEach((key) => {
							if (!key.startsWith("CourseEdition:")) {
								return
							}
							const value = data[key as keyof typeof data] as
								| Record<keyof CourseEdition, unknown>
								| undefined

							if (
								typeof value === "object" &&
								value &&
								typeof value.course === "object" &&
								value.course &&
								hasProperty(value.course, "id") &&
								hasProperty(value.course, "__ref")
							) {
								const { id } = value
								const { __ref } = value.course

								if (
									typeof id === "string" &&
									typeof __ref === "string" &&
									cache.identify({ __typename: "Course", id: courseId }) === cache.identify({ __ref })
								) {
									courseEditionIds.push(id)
								}
							}
						})
					}

					courseEditionIds.forEach((courseEditionId) => {
						cache.modify({
							id: cache.identify({ __typename: "CourseEdition", id: courseEditionId }),
							fields: {
								courseClassLists(_, { DELETE }) {
									return DELETE
								},
							},
						})
					})
				},
			})
		},
		[loading]
	)

	React.useEffect(() => {
		if (data?.createCourseClassList.__typename === "CreateCourseClassListPayload") {
			onClose?.()
		}
	}, [data])

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleValidSubmit)}>
			<Stack tokens={{ childrenGap: 10 }}>
				<FormTextField
					name="name"
					controllerProps={{ defaultValue: "" }}
					control={control}
					textFieldProps={{ label: "Nombre" }}
					validationSchema={validationSchema}
				/>
				<FormTextField
					name="code"
					controllerProps={{ defaultValue: "" }}
					control={control}
					textFieldProps={{ label: "Código" }}
					validationSchema={validationSchema}
				/>
				<FormTextField
					name="year"
					controllerProps={{ defaultValue: new Date().getFullYear().toString() }}
					control={control}
					textFieldProps={{ label: "Año" }}
					validationSchema={validationSchema}
				/>

				<FormCheckbox
					control={control}
					name="oddSemester"
					validationSchema={validationSchema}
					checkboxProps={{ label: "Semestre impar" }}
				/>

				<FormDropdown
					control={control}
					dropdownProps={{
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

export const CreateCourseClassListForm = React.memo(CreateCourseClassListFormComponent)
