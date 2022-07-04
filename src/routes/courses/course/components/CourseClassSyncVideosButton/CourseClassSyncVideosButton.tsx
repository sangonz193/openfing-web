import type { ICommandBarItemProps } from "@fluentui/react"
import { CommandBarButton } from "@fluentui/react"
import React from "react"

import { REFRESH_OUTLINE_ICON_NAME } from "../../../../../components/Icon/refresh-outline.generated"
import { useCourseSelectionStore } from "../../../../../modules/CourseSelection"
import type { SyncCourseClassVideosForClassMutationVariables } from "./CourseClassSyncVideosButton.urqlGraphql.generated"
import { useSyncCourseClassVideosForClassMutation } from "./CourseClassSyncVideosButton.urqlGraphql.generated"
import { useCourseClassSyncVideosButtonStyles } from "./useCourseClassSyncVideosButtonStyles"

export type CourseClassSyncVideosButtonProps = ICommandBarItemProps

const CourseClassSyncVideosButtonComponent: React.FC<CourseClassSyncVideosButtonProps> = ({ className }) => {
	const styles = useCourseClassSyncVideosButtonStyles({
		className,
	})

	const [{ fetching, data }, syncCourseClassVideos] = useSyncCourseClassVideosForClassMutation()
	const courseSelectionStore = useCourseSelectionStore()

	React.useEffect(() => {
		if (
			!data?.syncCourseClassVideosForClass?.__typename ||
			data.syncCourseClassVideosForClass.__typename === "SyncCourseClassVideosForClassPayload"
		) {
			return
		}

		const { syncCourseClassVideosForClass } = data

		switch (syncCourseClassVideosForClass.__typename) {
			case "NotFoundError": {
				alert("No se encontró la clase.")
				return
			}
			case "AuthenticationError": {
				alert("Error de credenciales.")
				return
			}
			case "GenericError": {
				alert("Error inesperado.")
				return
			}
		}
	}, [data])

	const handleClick = React.useCallback(async () => {
		const selection = courseSelectionStore.selection.getValue()

		const courseClassListRef:
			| Exclude<
					SyncCourseClassVideosForClassMutationVariables["courseClassRef"]["byNumber"],
					undefined | null
			  >["courseClassList"]
			| undefined = selection.courseClassListCode
			? {
					byCode: { code: selection.courseClassListCode },
			  }
			: selection.courseClassListId
			? {
					byId: { id: selection.courseClassListId },
			  }
			: undefined

		if (!courseClassListRef) {
			alert("No hay ninguna lista seleccionada.")
			return
		}

		const courseClassRef: SyncCourseClassVideosForClassMutationVariables["courseClassRef"] | undefined =
			selection.courseClassId
				? { byId: { id: selection.courseClassId } }
				: typeof selection.courseClassNumber === "number" &&
				  (selection.courseClassListCode || selection.courseClassListId)
				? {
						byNumber: {
							number: selection.courseClassNumber,
							courseClassList: courseClassListRef,
						},
				  }
				: undefined

		if (!courseClassRef) {
			alert("No hay ninguna clase seleccionada.")
			return
		}

		if (courseClassRef) {
			await syncCourseClassVideos({
				courseClassRef: courseClassRef,
			})
		}
	}, [syncCourseClassVideos])

	return (
		<CommandBarButton
			disabled={fetching}
			className={styles.commandButton}
			iconProps={{ iconName: REFRESH_OUTLINE_ICON_NAME }}
			onClick={handleClick}
		>
			Actualizar links de videos
		</CommandBarButton>
	)
}

export const CourseClassSyncVideosButton = React.memo(CourseClassSyncVideosButtonComponent)
