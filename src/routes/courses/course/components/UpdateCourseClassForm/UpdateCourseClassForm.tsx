import React from "react"
import type { SubmitHandler } from "react-hook-form"

import type {
	CreateUpdateCourseClassFormProps,
	CreateUpdateCourseClassFormValues,
} from "../CreateUpdateCourseClassForm"
import { CreateUpdateCourseClassForm } from "../CreateUpdateCourseClassForm"
import type { UpdateCourseClassFormCourseClassFragmentFragment } from "./UpdateCourseClassForm.urqlGraphql.generated"
import { useUpdateCourseClassMutation } from "./UpdateCourseClassForm.urqlGraphql.generated"

export type CreateCourseClassFormProps = {
	children?: undefined
	className?: string
	courseClass: UpdateCourseClassFormCourseClassFragmentFragment
	onClose: () => void
}

const CreateCourseClassFormComponent: React.FC<CreateCourseClassFormProps> = ({ className, courseClass, onClose }) => {
	const [{ fetching, data }, updateCourseClassMutation] = useUpdateCourseClassMutation()

	const handleValidSubmit = React.useCallback<SubmitHandler<CreateUpdateCourseClassFormValues>>(
		(data) => {
			if (fetching) {
				return
			}

			updateCourseClassMutation({
				ref: {
					byId: {
						id: courseClass.id,
					},
				},
				input: {
					name: data.name ?? undefined,
					number: data.number,
					visibility: data.visibility,
					publishedAt: data.publishedAt.toISOString(),
				},
			})
		},
		[fetching]
	)

	React.useEffect(() => {
		if (data?.updateCourseClass_v2.__typename === "UpdateCourseClassPayload") {
			onClose?.()
		}
	}, [data])

	const defaultValues = React.useMemo<CreateUpdateCourseClassFormProps["defaultValues"]>(
		() => ({
			name: courseClass.name ?? undefined,
			number: courseClass.number ?? undefined,
			visibility: courseClass.visibility ?? undefined,
		}),
		[]
	)

	return (
		<CreateUpdateCourseClassForm className={className} defaultValues={defaultValues} onSubmit={handleValidSubmit} />
	)
}

export const CreateCourseClassForm = React.memo(CreateCourseClassFormComponent)
