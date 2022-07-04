import React from "react"
import type { SubmitHandler } from "react-hook-form"

import type { CreateCourseClassInputVisibility } from "../../../../../graphql/remoteSchema.types"
import { CreateUpdateCourseClassForm } from "../CreateUpdateCourseClassForm"
import { useCreateCourseClassMutation } from "./CreateCourseClassForm.urqlGraphql.generated"

export type CreateCourseClassFormProps = {
	children?: undefined
	className?: string
	courseClassListCode: string
	onClose: () => void
}

const CreateCourseClassFormComponent: React.FC<CreateCourseClassFormProps> = ({
	className,
	courseClassListCode,
	onClose,
}) => {
	const [{ fetching, data }, createCourseClass] = useCreateCourseClassMutation()

	type FormValues = {
		name?: string
		number: number
		visibility: CreateCourseClassInputVisibility
	}

	const handleValidSubmit = React.useCallback<SubmitHandler<FormValues>>(
		(data) => {
			if (fetching) {
				return
			}

			createCourseClass({
				input: {
					courseClassListRef: {
						byCode: {
							code: courseClassListCode,
						},
					},
					name: data.name ?? `Clase ${data.number}`,
					number: data.number,
					visibility: data.visibility,
				},
			})
		},
		[fetching]
	)

	React.useEffect(() => {
		if (data?.createCourseClass_v2.__typename === "CreateCourseClassPayload") {
			onClose?.()
		}
	}, [data])

	return <CreateUpdateCourseClassForm className={className} onSubmit={handleValidSubmit} />
}

export const CreateCourseClassForm = React.memo(CreateCourseClassFormComponent)
