import { Panel } from "@fluentui/react"
import React from "react"

import type { PostFragmentFragment } from "../Post/Post.urqlGraphql.generated"

const CreatePostForm = React.lazy(() =>
	import("../CreatePostForm/CreatePostForm").then(({ CreatePostForm }) => ({
		default: CreatePostForm,
	}))
)

export type CreatePostFormWrapperProps = {
	children?: undefined
	open: boolean
	initialData?: PostFragmentFragment
	onClose: () => void
}

const CreatePostFormWrapperComponent: React.FC<CreatePostFormWrapperProps> = ({ open, initialData, onClose }) => {
	return (
		<Panel
			headerText={initialData ? "Editar post" : "Crear post"}
			isOpen={open}
			closeButtonAriaLabel="Cerrar"
			onDismiss={onClose}
		>
			<React.Suspense fallback={null}>
				<CreatePostForm initialData={initialData} onClose={onClose} />
			</React.Suspense>
		</Panel>
	)
}

export const CreatePostFormWrapper = React.memo(CreatePostFormWrapperComponent)
