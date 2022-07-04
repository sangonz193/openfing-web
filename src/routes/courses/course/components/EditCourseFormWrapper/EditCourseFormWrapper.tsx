import { Panel } from "@fluentui/react"
import React from "react"

const EditCourseForm = React.lazy(() =>
	import("../EditCourseForm/EditCourseForm").then(({ EditCourseForm }) => ({
		default: EditCourseForm,
	}))
)

export type EditCourseFormWrapperProps = {
	children?: undefined
	courseId: string
	open: boolean
	onClose: () => void
}

const EditCourseFormWrapperComponent: React.FC<EditCourseFormWrapperProps> = ({ courseId, open, onClose }) => {
	return (
		<Panel headerText="Editar curso" isOpen={open} closeButtonAriaLabel="Cerrar" onDismiss={onClose}>
			<React.Suspense fallback={null}>
				<EditCourseForm courseId={courseId} onClose={onClose} />
			</React.Suspense>
		</Panel>
	)
}

export const EditCourseFormWrapper = React.memo(EditCourseFormWrapperComponent)
