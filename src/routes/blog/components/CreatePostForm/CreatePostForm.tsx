import { PrimaryButton, Stack } from "@fluentui/react"
import type { SafeOmit } from "@sangonz193/utils"
import { parseISO } from "date-fns"
import React from "react"
import type { SubmitHandler } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"

import type { CreatePostInput } from "../../../../graphql/remoteSchema.types"
import { useYupResolver } from "../../../../hooks/useYupResolver"
import { useDatePickerControllerProps } from "../../../../useComponentProps/useDatePickerControllerProps"
import { useTextFieldControllerProps } from "../../../../useComponentProps/useTextFieldControllerProps"
import type { PostFragmentFragment } from "../Post/Post.urqlGraphql.generated"
import { useCreatePostMutation, useUpdatePostMutation } from "./CreatePostForm.urqlGraphql.generated"
import { useCreatePostFormStyles } from "./useCreatePostFormStyles"

export type CreatePostFormProps = {
	children?: undefined
	className?: string
	initialData?: PostFragmentFragment
	onClose: () => void
}

type CreatePostFormValues = {
	[K in keyof SafeOmit<CreatePostInput, "publishedAt">]: Exclude<CreatePostInput[K], null>
} & {
	publishedAt: Date | undefined
}

const CreatePostFormComponent: React.FC<CreatePostFormProps> = ({ className, initialData, onClose }) => {
	const styles = useCreatePostFormStyles({
		className,
	})

	const [createPostResponse, createPost] = useCreatePostMutation()
	const [updatePostResponse, updatePost] = useUpdatePostMutation()

	const validationSchema = React.useMemo(() => {
		return yup.object<yup.SchemaOf<CreatePostFormValues>["fields"]>({
			mdContent: yup.string().required(),
			title: yup.string().required(),
			publishedAt: yup.date().notRequired(),
		})
	}, [])

	const yupResolver = useYupResolver(validationSchema)
	const { control, handleSubmit } = useForm<CreatePostFormValues>({
		resolver: yupResolver,
		defaultValues: initialData
			? {
					mdContent: initialData.mdContent,
					title: initialData.title,
					publishedAt: initialData.publishedAt ? parseISO(initialData.publishedAt) : undefined,
			  }
			: undefined,
	})

	const handleValidSubmit = React.useCallback<SubmitHandler<CreatePostFormValues>>(
		(values) => {
			if (initialData) {
				updatePost({
					input: {
						publishedAt: values.publishedAt?.toISOString(),
						title: values.title,
						mdContent: values.mdContent,
					},
					id: initialData.id,
				})
			} else {
				createPost({
					input: {
						publishedAt: values.publishedAt?.toISOString(),
						title: values.title,
						mdContent: values.mdContent,
					},
				})
			}
		},
		[initialData]
	)

	React.useEffect(() => {
		if (
			createPostResponse.data?.createPost.__typename === "CreatePostPayload" ||
			updatePostResponse.data?.updatePost.__typename === "UpdatePostPayload"
		) {
			onClose?.()
		}
	}, [createPostResponse.data?.createPost.__typename, updatePostResponse.data?.updatePost.__typename])

	const content = (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleValidSubmit)} noValidate>
			<Stack tokens={{ childrenGap: 10 }} disableShrink>
				<Controller
					{...useTextFieldControllerProps({
						name: "title",
						control: control,
						textFieldProps: { label: "Título" },
						validationSchema: validationSchema,
					})}
				/>

				<Controller
					{...useTextFieldControllerProps({
						name: "mdContent",
						control: control,
						textFieldProps: { label: "Contenido", multiline: true, rows: 10 },
						validationSchema: validationSchema,
					})}
				/>

				<Controller
					{...useDatePickerControllerProps({
						name: "publishedAt",
						control: control,
						datePickerProps: { label: "Fecha de publicación" },
						validationSchema: validationSchema,
					})}
				/>

				<Stack horizontal>
					<Stack tokens={{ childrenGap: 20 }} style={{ marginTop: 20, marginRight: "auto" }}>
						<PrimaryButton type="submit">{initialData ? "Actualizar" : "Crear"}</PrimaryButton>
					</Stack>
				</Stack>
			</Stack>
		</form>
	)

	return content
}

export const CreatePostForm = React.memo(CreatePostFormComponent)
