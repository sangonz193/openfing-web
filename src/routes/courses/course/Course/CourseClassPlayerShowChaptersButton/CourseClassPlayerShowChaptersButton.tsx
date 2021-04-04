import { IListProps, List, Panel } from "@fluentui/react"
import React from "react"
import { useMediaQuery } from "react-responsive"

import { LIST_ICON_NAME } from "../../../../../components/Icon/List.icon"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { Breakpoint } from "../../../../../styles/Breakpoint"
import { CourseClassPlayerButton } from "../CourseClassPlayerButton"
import { CourseClassPlayerChapterItem } from "../CourseClassPlayerChapterItem"

export type CourseClassPlayerShowChaptersButtonProps = {
	children?: undefined
}

const CourseClassPlayerShowChaptersButtonComponent: React.FC<CourseClassPlayerShowChaptersButtonProps> = () => {
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const { chapterTextTracks, isFullscreen } = useReactiveVars(courseClassPlayerStore, [
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

	return (
		<>
			<CourseClassPlayerButton iconName={LIST_ICON_NAME} buttonProps={{ onClick: handleShowPanelButtonPress }} />

			<Panel
				headerText="Índice de temas"
				isOpen={panelVisible}
				isLightDismiss
				layerProps={{ hostId: isMd || isFullscreen ? "course-class-player-controls" : undefined }}
				onDismiss={handlePanelDismiss}
			>
				<List items={chapterTextTracks} onRenderCell={handleRenderCell} getKey={handleGetKey} />
			</Panel>
		</>
	)
}

export const CourseClassPlayerShowChaptersButton = React.memo(CourseClassPlayerShowChaptersButtonComponent)
