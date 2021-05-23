import { PrimaryButton, Stack } from "@fluentui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { identity } from "lodash"
import React, { useCallback } from "react"
import { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { dangerousKeysOf } from "../../../../_utils/dangerousKeysOf"
import { FormDropdown } from "../../../../components/FormDropdown/FormDropdown"
import { FormTextField } from "../../../../components/FormTextField/FormTextField"
import { CreateCourseInputVisibility } from "../../../../graphql/remoteSchema.types"
import { useCreateCourseMutation } from "./CreateCourseForm.graphql.generated"
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

	const { secret } = { secret: undefined as undefined | string } // TODO: get isAdmin condition

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

	const [createCourse, { data }] = useCreateCourseMutation()

	const formResolver = React.useMemo(() => yupResolver(validationSchema), [validationSchema])
	const { handleSubmit, control } = useForm<FormValues>({ resolver: formResolver, mode: "onTouched" })
	const handleValidSubmit = useCallback<SubmitHandler<FormValues>>(
		(data) => {
			if (!secret) {
				return
			}

			createCourse({
				variables: {
					secret,
					input: {
						name: data.name,
						code: data.code,
						eva: data.eva,
						visibility: data.visibility,
					},
				},
				update: (cache, mutationResult) => {
					if (mutationResult.data?.createCourse.__typename !== "CreateCoursePayload") {
						return
					}

					cache.modify({
						fields: {
							courses() {
								return undefined
							},
						},
					})
				},
			})
		},
		[secret]
	)

	React.useEffect(() => {
		if (data?.createCourse.__typename === "CreateCoursePayload") {
			onClose?.()
		}
	}, [data])

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleValidSubmit)}>
			<Stack tokens={{ childrenGap: 10 }}>
				<FormTextField
					name="name"
					control={control}
					textFieldProps={{ label: "Nombre" }}
					validationSchema={validationSchema}
				/>
				<FormTextField
					name="code"
					control={control}
					textFieldProps={{ label: "Código" }}
					validationSchema={validationSchema}
				/>
				<FormTextField
					name="eva"
					control={control}
					textFieldProps={{ label: "Eva" }}
					validationSchema={validationSchema}
				/>

				<FormDropdown
					control={control}
					dropdownProps={{
						label: "Visibilidad",
						options: [
							{
								key: identity<CreateCourseInputVisibility>("PUBLIC"),
								text: "Público",
							},
							{
								key: identity<CreateCourseInputVisibility>("HIDDEN"),
								text: "Oculto",
							},
							{
								key: identity<CreateCourseInputVisibility>("DISABLED"),
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

export const CreateCourseForm = React.memo(CreateCourseFormComponent)
