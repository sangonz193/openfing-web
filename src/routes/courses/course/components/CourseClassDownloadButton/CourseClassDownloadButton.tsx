import type { ICommandBarItemProps } from "@fluentui/react"
import { CommandBarButton } from "@fluentui/react"
import React from "react"

import { DOWNLOAD_OUTLINE_ICON_NAME } from "../../../../../components/Icon/download-outline.generated"
import { CourseClassDownloadModal } from "../CourseClassDownloadModal"
import { useCourseClassDownloadButtonStyles } from "./useCourseClassDownloadButtonStyles"

export type CourseClassDownloadButtonProps = ICommandBarItemProps

const CourseClassDownloadButtonComponent: React.FC<CourseClassDownloadButtonProps> = ({ className }) => {
	const styles = useCourseClassDownloadButtonStyles({
		className,
	})

	const [modalVisible, setModalVisible] = React.useState(false)

	const handleClick = React.useCallback(() => setModalVisible(true), [])
	const handleClose = React.useCallback(() => setModalVisible(false), [])

	return (
		<>
			<CommandBarButton
				className={styles.commandButton}
				iconProps={{ iconName: DOWNLOAD_OUTLINE_ICON_NAME }}
				onClick={handleClick}
			>
				Descargar
			</CommandBarButton>

			<CourseClassDownloadModal visible={modalVisible} onClose={handleClose} />
		</>
	)
}

export const CourseClassDownloadButton = React.memo(CourseClassDownloadButtonComponent)
