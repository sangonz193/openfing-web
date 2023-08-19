import type { IListProps } from "@fluentui/react"
import { List, Panel } from "@fluentui/react"
import React from "react"
import { useMediaQuery } from "react-responsive"

import { LIST_OUTLINE_ICON_NAME } from "../../../../../components/Icon/list-outline.generated"
import { useCourseClassPlayerStore } from "../../../../../courseClassPlayer"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { Breakpoint } from "../../../../../styles/Breakpoint"
import { CourseClassPlayerButton } from "../CourseClassPlayerButton"
import { CourseClassPlayerChapterItem } from "../CourseClassPlayerChapterItem"
import { useCourseClassPlayerShowChaptersButtonStyles } from "./useCourseClassPlayerShowChaptersButtonStyles"

export type CourseClassPlayerShowChaptersButtonProps = {
	children?: undefined
}

const CourseClassPlayerShowChaptersButtonComponent: React.FC<CourseClassPlayerShowChaptersButtonProps> = () => {
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const { chapterTextTracks, isFullscreen } = useObservableStates(courseClassPlayerStore, [
		"isFullscreen",
		"chapterTextTracks",
	])

	const [panelVisible, setPanelVisible] = React.useState(false)

	const handleShowPanelButtonPress = React.useCallback(() => setPanelVisible(true), [])

	const handlePanelDismiss = React.useCallback(() => setPanelVisible(false), [])

	const handleRenderCell = React.useCallback<Required<IListProps<VTTCue>>["onRenderCell"]>((item) => {
		if (!item) {
			return null
		}

		return <CourseClassPlayerChapterItem vttCue={item} requestClosePanel={handlePanelDismiss} />
	}, [])

	const handleGetKey = React.useCallback<Required<IListProps<VTTCue>>["getKey"]>((item) => item.id, [])

	const isMd = useMediaQuery({ minWidth: Breakpoint.md })

	const styles = useCourseClassPlayerShowChaptersButtonStyles({})

	return (
		<>
			<CourseClassPlayerButton
				iconName={LIST_OUTLINE_ICON_NAME}
				buttonProps={{ onClick: handleShowPanelButtonPress }}
			/>

			<Panel
				headerText="Índice de temas"
				isOpen={panelVisible}
				isLightDismiss
				layerProps={{ hostId: isMd || isFullscreen ? "course-class-player-controls" : undefined }}
				onDismiss={handlePanelDismiss}
			>
				<List
					className={styles.list}
					items={chapterTextTracks}
					onRenderCell={handleRenderCell}
					getKey={handleGetKey}
				/>
			</Panel>
		</>
	)
}

export const CourseClassPlayerShowChaptersButton = React.memo(CourseClassPlayerShowChaptersButtonComponent)
