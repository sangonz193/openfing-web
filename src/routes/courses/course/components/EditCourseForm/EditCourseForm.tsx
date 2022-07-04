import type { IDropdownOption } from "@fluentui/react"
import { PrimaryButton, Stack } from "@fluentui/react"
import type { SafeOmit } from "@sangonz193/utils"
import { dangerousKeysOf } from "@sangonz193/utils"
import identity from "lodash/identity"
import React from "react"
import type { SubmitHandler } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"

import type { CreateCourseInputVisibility, UpdateCourseInput } from "../../../../../graphql/remoteSchema.types"
import { useYupResolver } from "../../../../../hooks/useYupResolver"
import { useDropdownControllerProps } from "../../../../../useComponentProps/useDropdownControllerProps"
import { useTextFieldControllerProps } from "../../../../../useComponentProps/useTextFieldControllerProps"
import { useCourseByIdQuery, useUpdateCourseMutation } from "./EditCourseForm.urqlGraphql.generated"
import { useEditCourseFormStyles } from "./useEditCourseFormFormStyles"

export type EditCourseFormProps = {
	children?: undefined
	className?: string
	courseId: string
	onClose: () => void
}

type EditCourseFormValues = {
	[K in keyof UpdateCourseInput]: Exclude<UpdateCourseInput[K], null>
}

const EditCourseFormComponent: React.FC<EditCourseFormProps> = ({ className, courseId, onClose }) => {
	const styles = useEditCourseFormStyles({
		className,
	})

	const [courseClassQueryResult] = useCourseByIdQuery({
		variables: {
			id: courseId,
		},
	})
	const courseById =
		courseClassQueryResult.data && courseClassQueryResult.data.courseById.__typename === "Course"
			? courseClassQueryResult.data.courseById
			: undefined

	const [setCourseClassLiveStateMutationResponse, setCourseClassLiveState] = useUpdateCourseMutation()

	const validationSchema = React.useMemo(() => {
		return yup.object<yup.SchemaOf<EditCourseFormValues>["fields"]>({
			name: yup.string().notRequired(),
			code: yup.string().notRequired(),
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
	}, [courseById])

	const yupResolver = useYupResolver(validationSchema)
	const { control, handleSubmit } = useForm<EditCourseFormValues>({
		resolver: yupResolver,
		defaultValues: courseById
			? {
					code: courseById.code,
					eva: courseById.eva || undefined,
					name: courseById.name,
					visibility: courseById.visibility || undefined,
			  }
			: undefined,
	})

	const handleValidSubmit = React.useCallback<SubmitHandler<EditCourseFormValues>>(
		(values) => {
			const undefinedIfSame = <TKey extends keyof EditCourseFormValues>(
				key: TKey
			): EditCourseFormValues[TKey] | undefined => {
				if (!courseById || courseById.__typename !== "Course") {
					return values[key]
				}

				return courseById[key] === values[key] ? undefined : values[key]
			}

			setCourseClassLiveState({
				ref: {
					byId: { id: courseId },
				},
				input: {
					code: undefinedIfSame("code"),
					eva: undefinedIfSame("eva"),
					name: undefinedIfSame("name"),
					visibility: undefinedIfSame("visibility"),
				},
			})
		},
		[courseId]
	)

	React.useEffect(() => {
		if (setCourseClassLiveStateMutationResponse.data?.updateCourse.__typename === "UpdateCoursePayload") {
			onClose?.()
		}
	}, [setCourseClassLiveStateMutationResponse.data?.updateCourse.__typename])

	const content = (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleValidSubmit)} noValidate>
			<Stack tokens={{ childrenGap: 10 }} disableShrink>
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

				<Stack horizontal>
					<Stack tokens={{ childrenGap: 20 }} style={{ marginTop: 20, marginRight: "auto" }}>
						<PrimaryButton type="submit">{courseById ? "Actualizar" : "Crear"}</PrimaryButton>
					</Stack>
				</Stack>
			</Stack>
		</form>
	)

	if (courseClassQueryResult.fetching) {
		return null
	}

	return content
}

export const EditCourseForm = React.memo(EditCourseFormComponent)
