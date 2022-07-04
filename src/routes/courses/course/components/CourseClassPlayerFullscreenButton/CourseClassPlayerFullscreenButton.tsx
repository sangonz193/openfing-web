import React from "react"

import { CONTRACT_TWO_ARROWS_ICON_NAME } from "../../../../../components/Icon/contract-two-arrows.generated"
import { RESIZE_OUTLINE_ICON_NAME } from "../../../../../components/Icon/resize-outline.generated"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useIsPlayerLoaded } from "../../hooks/useIsPlayerLoaded"
import type { CourseClassPlayerButtonProps } from "../CourseClassPlayerButton"
import { CourseClassPlayerButton } from "../CourseClassPlayerButton"

export type CourseClassPlayerFullscreenButtonProps = {
	children?: undefined
}

const CourseClassPlayerFullscreenButtonComponent: React.FC<CourseClassPlayerFullscreenButtonProps> = ({}) => {
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const { isFullscreen } = useObservableStates(courseClassPlayerStore, ["isFullscreen"])
	const isPlayerLoaded = useIsPlayerLoaded()

	const buttonProps = React.useMemo<CourseClassPlayerButtonProps["buttonProps"]>(
		() => ({
			disabled: !isPlayerLoaded,
			onClick: (e) => {
				if (e?.defaultPrevented) {
					return
				}

				e?.preventDefault()
				courseClassPlayerStore.toggleFullscreen()
			},
		}),
		[isPlayerLoaded]
	)

	React.useEffect(() => {
		if (!isPlayerLoaded && isFullscreen) {
			courseClassPlayerStore.toggleFullscreen()
		}
	}, [!isPlayerLoaded && isFullscreen])

	return (
		<CourseClassPlayerButton
			iconName={isFullscreen ? CONTRACT_TWO_ARROWS_ICON_NAME : RESIZE_OUTLINE_ICON_NAME}
			buttonProps={buttonProps}
		/>
	)
}

export const CourseClassPlayerFullscreenButton = React.memo(CourseClassPlayerFullscreenButtonComponent)
