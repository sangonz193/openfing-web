import type { ICommandBarItemProps } from "@fluentui/react"
import { CommandBarButton } from "@fluentui/react"
import React from "react"

import { SHARE_SOCIAL_OUTLINE_ICON_NAME } from "../../../../../components/Icon/share-social-outline.generated"
import { CourseClassShareModal } from "../CourseClassShareModal"
import { useCourseClassShareButtonStyles } from "./useCourseClassShareButtonStyles"

export type CourseClassShareButtonProps = ICommandBarItemProps

const CourseClassShareButtonComponent: React.FC<CourseClassShareButtonProps> = ({ className }) => {
	const styles = useCourseClassShareButtonStyles({
		className,
	})

	const [modalVisible, setModalVisible] = React.useState(false)

	const handleClick = React.useCallback(() => setModalVisible(true), [])
	const handleClose = React.useCallback(() => setModalVisible(false), [])

	return (
		<>
			<CommandBarButton
				className={styles.commandButton}
				iconProps={{ iconName: SHARE_SOCIAL_OUTLINE_ICON_NAME }}
				onClick={handleClick}
			>
				Compartir
			</CommandBarButton>

			<CourseClassShareModal visible={modalVisible} onClose={handleClose} />
		</>
	)
}

export const CourseClassShareButton = React.memo(CourseClassShareButtonComponent)
