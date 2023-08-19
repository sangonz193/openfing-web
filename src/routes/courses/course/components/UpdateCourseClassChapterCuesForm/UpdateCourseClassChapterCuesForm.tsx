import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Stack, TextField } from "@fluentui/react"
import React from "react"
import type { SubmitHandler } from "react-hook-form"
import { Controller } from "react-hook-form"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { TRASH_OUTLINE_ICON_NAME } from "../../../../../components/Icon/trash-outline.generated"
import { isFieldRequired } from "../../../../../form/isFieldRequired"
import type { CreateCourseClassChapterCueInput } from "../../../../../graphql/remoteSchema.types"
import { useYupResolver } from "../../../../../hooks/useYupResolver"
import {
	useCourseClassByIdQuery,
	useCreateCourseClassChapterCueMutation,
	useDeleteCourseClassChapterCuesFromCourseClassMutation,
} from "./UpdateCourseClassChapterCuesForm.urqlGraphql.generated"
import { useUpdateCourseClassChapterCuesFormStyles } from "./useUpdateCourseClassChapterCuesFormStyles"

export type UpdateCourseClassChapterCuesFormProps = {
	children?: undefined
	className?: string
	courseClassId: string
	onClose: () => void
}

type UpdateCourseClassChapterCuesFormValues = {
	cues: string
}

const UpdateCourseClassChapterCuesFormComponent: React.FC<UpdateCourseClassChapterCuesFormProps> = ({
	className,
	courseClassId,
	onClose,
}) => {
	const styles = useUpdateCourseClassChapterCuesFormStyles({
		className,
	})

	const [createCourseClassChapterCueResponse, createCourseClassChapterCue] = useCreateCourseClassChapterCueMutation()
	const [courseClassByIdResponse] = useCourseClassByIdQuery({
		variables: {
			id: courseClassId,
		},
	})
	const { courseClassById } = courseClassByIdResponse.data ?? {}
	const cuesFromClass = courseClassById?.__typename === "CourseClass" ? courseClassById.chapterCues : undefined

	const validationSchema = React.useMemo(() => {
		return yup.object<yup.SchemaOf<UpdateCourseClassChapterCuesFormValues>["fields"]>({
			cues: yup
				.string()
				.trim()
				.required("El campo es requerido.")
				.nullable(false)
				.test((value, context) => {
					if (
						value?.match(
							/^(\d{2}:\d{2}:\d{2}[.,]\d{3})\s-->\s(\d{2}:\d{2}:\d{2}[.,]\d{3})\n(.*(?:\r?\n(?!\r?\n).*)*)/gm
						)
					) {
						return true
					}

					return context.createError({ message: "El formato no es el esperado." })
				}),
		})
	}, [])

	const formatTime = (time: number): string => {
		const secondsInMinute = 60
		const secondsInHour = secondsInMinute * 60
		const hours = Math.floor(time / secondsInHour)
		const minutes = Math.floor((time - hours * secondsInHour) / secondsInMinute)
		const seconds = Math.floor(time - hours * secondsInHour - minutes * secondsInMinute)

		return (
			[
				hours.toString().padStart(2, "0"),
				minutes.toString().padStart(2, "0"),
				seconds.toString().padStart(2, "0"),
			].join(":") +
			"." +
			((time - (hours * secondsInHour + minutes * secondsInMinute + seconds)) * 1000)
				.toString()
				.padStart(3, "0")
				.slice(0, 3)
		)
	}

	const yupResolver = useYupResolver(validationSchema)
	const { control, handleSubmit } = useForm({
		resolver: yupResolver,
		defaultValues: cuesFromClass
			? {
					cues: cuesFromClass
						.map((cue) => {
							return [`${formatTime(cue.startSeconds)} --> ${formatTime(cue.endSeconds)}`, cue.name].join(
								"\n"
							)
						})
						.join("\n\n"),
			  }
			: undefined,
	})

	const handleValidSubmit = React.useCallback<SubmitHandler<UpdateCourseClassChapterCuesFormValues>>(
		async (values) => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const regex = /^(\d{2}:\d{2}:\d{2}[.,]\d{3})\s-->\s(\d{2}:\d{2}:\d{2}[.,]\d{3})\n(.*(?:\r?\n(?!\r?\n).*)*)/m
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const cuesMatches = values.cues.match(new RegExp(regex, "gm"))!

			const cuesInput: CreateCourseClassChapterCueInput[] = cuesMatches.map<CreateCourseClassChapterCueInput>(
				(cuesMatch) => {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					const [, startTime, endTime, name] = cuesMatch.match(regex)!

					const getSeconds = (formattedTime: string) => {
						const [hours, minutes, seconds] = formattedTime.split(":")

						return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds)
					}

					return {
						courseClassRef: {
							byId: { id: courseClassId },
						},
						data: {
							startSeconds: getSeconds(startTime),
							endSeconds: getSeconds(endTime),
							name: name.trim(),
						},
					}
				}
			)

			await deleteCourseClassChapterCuesFromCourseClass({
				input: {
					courseClassRef: {
						byId: { id: courseClassId },
					},
				},
			})
			await Promise.all(
				cuesInput.map((input) =>
					createCourseClassChapterCue({
						input: input,
					})
				)
			)
		},
		[courseClassId]
	)

	React.useEffect(() => {
		if (
			createCourseClassChapterCueResponse.data?.createCourseClassChapterCue.__typename ===
			"CreateCourseClassChapterCuePayload"
		) {
			onClose()
		}
	}, [createCourseClassChapterCueResponse.data?.createCourseClassChapterCue.__typename])

	const [confirmDeleteDialogVisible, setConfirmDeleteDialogVisible] = React.useState(false)

	const [deleteCourseClassChapterCuesFromCourseClassResponse, deleteCourseClassChapterCuesFromCourseClass] =
		useDeleteCourseClassChapterCuesFromCourseClassMutation()

	const handleDeleteClassCues = React.useCallback(() => {
		setConfirmDeleteDialogVisible(true)
	}, [])
	const handleConfirmDeleteClassCues = React.useCallback(async () => {
		await deleteCourseClassChapterCuesFromCourseClass({
			input: {
				courseClassRef: {
					byId: { id: courseClassId },
				},
			},
		})
		onClose()
	}, [courseClassId, onClose])

	if (courseClassByIdResponse.fetching) {
		return null
	}

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleValidSubmit)} noValidate>
			<Stack tokens={{ childrenGap: 10 }}>
				<Controller
					key={cuesFromClass?.length}
					name="cues"
					control={control}
					render={({ field: { onChange, onBlur, name: fieldName, value }, fieldState: { error } }) => (
						<TextField
							label="Capítulos (.vtt)"
							onChange={onChange}
							value={value as string}
							onBlur={onBlur}
							name={fieldName}
							errorMessage={error?.message}
							multiline
							rows={10}
							required={isFieldRequired(validationSchema, "cues")}
						/>
					)}
				/>

				<Stack horizontal>
					<Stack tokens={{ childrenGap: 20 }} style={{ marginTop: 20, marginRight: "auto" }}>
						<PrimaryButton
							type="submit"
							disabled={
								deleteCourseClassChapterCuesFromCourseClassResponse.fetching ||
								createCourseClassChapterCueResponse.fetching
							}
						>
							Enviar
						</PrimaryButton>

						<DefaultButton
							iconProps={{ iconName: TRASH_OUTLINE_ICON_NAME }}
							className={styles.deleteButton}
							onClick={handleDeleteClassCues}
							disabled={
								deleteCourseClassChapterCuesFromCourseClassResponse.fetching ||
								createCourseClassChapterCueResponse.fetching
							}
						>
							Eliminar capítulos
						</DefaultButton>
					</Stack>
				</Stack>

				<Dialog
					hidden={!confirmDeleteDialogVisible}
					dialogContentProps={{
						type: DialogType.normal,
						title: "Confirmación",
						subText: "¿Quiere eliminar los capítulos de esta clase?",
					}}
					onDismiss={() => setConfirmDeleteDialogVisible(false)}
				>
					<DialogFooter>
						<PrimaryButton onClick={handleConfirmDeleteClassCues} text="Eliminar" />
						<DefaultButton onClick={() => setConfirmDeleteDialogVisible(false)} text="Cancelar" />
					</DialogFooter>
				</Dialog>
			</Stack>
		</form>
	)
}

export const UpdateCourseClassChapterCuesForm = React.memo(UpdateCourseClassChapterCuesFormComponent)
