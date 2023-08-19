import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Stack, TextField } from "@fluentui/react"
import { parseISO } from "date-fns"
import React from "react"
import type { SubmitHandler } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"

import { TRASH_OUTLINE_ICON_NAME } from "../../../../../components/Icon/trash-outline.generated"
import { useCheckboxControllerProps } from "../../../../../fluentui/useCheckboxControllerProps"
import { useDatePickerControllerProps } from "../../../../../fluentui/useDatePickerControllerProps"
import { useTextFieldControllerProps } from "../../../../../fluentui/useTextFieldControllerProps"
import { isFieldRequired } from "../../../../../form/isFieldRequired"
import { useYupResolver } from "../../../../../hooks/useYupResolver"
import {
	useCourseClassByIdQuery,
	useSetCourseClassLiveStateMutation,
} from "./EditCourseClassLiveStateForm.urqlGraphql.generated"
import { useEditCourseClassLiveStateFormStyles } from "./useEditCourseClassLiveStateFormStyles"

export type EditCourseClassLiveStateFormProps = {
	children?: undefined
	className?: string
	courseClassId: string
	onClose: () => void
}

type EditCourseClassLiveStateFormValues = {
	html?: string
	inProgress?: boolean
	startDate?: Date
	time?: string
}

const EditCourseClassLiveStateFormComponent: React.FC<EditCourseClassLiveStateFormProps> = ({
	className,
	courseClassId,
	onClose,
}) => {
	const styles = useEditCourseClassLiveStateFormStyles({
		className,
	})

	const [courseClassQueryResult] = useCourseClassByIdQuery({
		variables: {
			id: courseClassId,
		},
	})
	const liveState =
		courseClassQueryResult.data && courseClassQueryResult.data.courseClassById.__typename === "CourseClass"
			? courseClassQueryResult.data.courseClassById.liveState
			: undefined

	const [setCourseClassLiveStateMutationResponse, setCourseClassLiveState] = useSetCourseClassLiveStateMutation()

	const validationSchema = React.useMemo(() => {
		return yup.object<yup.SchemaOf<EditCourseClassLiveStateFormValues>["fields"]>({
			html: yup.string().trim(),
			inProgress: yup.boolean(),
			startDate: yup.date(),
			time: yup
				.string()
				.trim()
				.test(function (value) {
					if ((this.parent as Partial<EditCourseClassLiveStateFormValues>).startDate && !value) {
						throw this.createError({
							message: "Si se especifica una fecha, se debe especificar una hora también.",
						})
					}

					return true
				})
				.matches(/\d\d:\d\d/, { excludeEmptyString: true, message: "El valor debe seguir el formato 'HH:mm'" }),
		})
	}, [liveState])

	const startDate = React.useMemo(
		() => (liveState?.startDate ? parseISO(liveState.startDate as string) : undefined),
		[liveState?.startDate]
	)
	const yupResolver = useYupResolver(validationSchema)
	const { control, handleSubmit } = useForm<EditCourseClassLiveStateFormValues>({
		resolver: yupResolver,
		defaultValues: liveState
			? {
					html: liveState.html ?? "",
					inProgress: liveState.inProgress ?? false,
					startDate: startDate,
					time: startDate
						? `${startDate.getHours().toString().padStart(2, "0")}:${startDate
								.getMinutes()
								.toString()
								.padStart(2, "0")}`
						: undefined,
			  }
			: undefined,
	})

	const handleValidSubmit = React.useCallback<SubmitHandler<EditCourseClassLiveStateFormValues>>(
		(values) => {
			const [hours, minutes] = values.time?.split(":").map(Number) || [undefined]

			if (typeof hours === "number" && typeof minutes === "number") {
				values.startDate?.setHours(hours, minutes)
			}

			setCourseClassLiveState({
				input: {
					courseClassRef: {
						byId: { id: courseClassId },
					},
					data: {
						html:
							liveState?.html === values.html
								? undefined
								: values.html?.length === 0
								? null
								: values.html,

						inProgress: values.inProgress,
						startDate: values.startDate?.toISOString(),
					},
				},
			})
		},
		[courseClassId]
	)

	React.useEffect(() => {
		if (
			setCourseClassLiveStateMutationResponse.data?.setCourseClassLiveState_v2.__typename ===
			"SetCourseClassLiveStatePayload"
		) {
			onClose?.()
		}
	}, [setCourseClassLiveStateMutationResponse.data?.setCourseClassLiveState_v2.__typename])

	const [confirmDeleteDialogVisible, setConfirmDeleteDialogVisible] = React.useState(false)

	const handleDeleteLiveState = React.useCallback(() => {
		setConfirmDeleteDialogVisible(true)
	}, [])
	const handleConfirmDeleteLiveState = React.useCallback(() => {
		setCourseClassLiveState(
			{
				input: {
					courseClassRef: {
						byId: { id: courseClassId },
					},
					data: null,
				},
			},
			{}
		)
	}, [courseClassId])

	const content = (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleValidSubmit)} noValidate>
			<Stack tokens={{ childrenGap: 10 }} disableShrink>
				<Controller
					{...useDatePickerControllerProps({
						control: control,
						name: "startDate",
						validationSchema: validationSchema,
						datePickerProps: { label: "Fecha de inicio", styles: { root: { marginTop: 10 } } },
					})}
				/>

				<Controller
					{...useTextFieldControllerProps({
						control: control,
						name: "time",
						validationSchema: validationSchema,
						textFieldProps: {
							label: "Hora",
							placeholder: `(e.g: '10:00', '14:30')`,
						},
					})}
				/>

				<Controller
					name="html"
					control={control}
					render={({ field: { onChange, onBlur, name: fieldName, value }, fieldState: { error } }) => (
						<TextField
							label="HTML a mostrar en el reproductor"
							onChange={onChange}
							value={value as string}
							onBlur={onBlur}
							name={fieldName}
							errorMessage={error?.message}
							multiline
							rows={10}
							required={isFieldRequired(validationSchema, "html")}
						/>
					)}
					defaultValue=""
				/>

				<Controller
					{...useCheckboxControllerProps({
						control: control,
						name: "inProgress",
						validationSchema: validationSchema,
						checkboxProps: { label: "En progreso", styles: { root: { "&&": { marginTop: 20 } } } },
					})}
				/>

				<Stack horizontal>
					<Stack tokens={{ childrenGap: 20 }} style={{ marginTop: 20, marginRight: "auto" }}>
						<PrimaryButton type="submit">{liveState ? "Actualizar información" : "Crear"}</PrimaryButton>

						{liveState && (
							<DefaultButton
								iconProps={{ iconName: TRASH_OUTLINE_ICON_NAME }}
								className={styles.deleteButton}
								onClick={handleDeleteLiveState}
							>
								Eliminar estado en vivo
							</DefaultButton>
						)}
					</Stack>
				</Stack>

				<Dialog
					hidden={!confirmDeleteDialogVisible}
					dialogContentProps={{
						type: DialogType.normal,
						title: "Confirmación",
						subText: "¿Quiere eliminar el estado en vivo de esta clase?",
					}}
					onDismiss={() => setConfirmDeleteDialogVisible(false)}
				>
					<DialogFooter>
						<PrimaryButton onClick={handleConfirmDeleteLiveState} text="Eliminar" />
						<DefaultButton onClick={() => setConfirmDeleteDialogVisible(false)} text="Cancelar" />
					</DialogFooter>
				</Dialog>
			</Stack>
		</form>
	)

	if (courseClassQueryResult.fetching) {
		return null
	}

	return content
}

export const EditCourseClassLiveStateForm = React.memo(EditCourseClassLiveStateFormComponent)
