import type { IContextualMenuItem, IContextualMenuItemProps } from "@fluentui/react"
import { ContextualMenuItem } from "@fluentui/react"
import React from "react"

import { registerCheckmarkIcon } from "../../../../../components/Icon/checkmark"
import { useCourseClassPlayerStore } from "../../../../../courseClassPlayer"
import { secondsToString } from "../../../../../courseClassPlayer/secondsToString"
import { useObservableStates } from "../../../../../hooks/useObservableStates"

registerCheckmarkIcon()

export type CourseClassPlayerPlaybackRateMenuItemProps = {
	children?: undefined
	contextualMenuItemProps: IContextualMenuItemProps
}

const CourseClassPlayerPlaybackRateMenuItemComponent: React.FC<CourseClassPlayerPlaybackRateMenuItemProps> = ({
	contextualMenuItemProps,
}) => {
	const playbackRate = contextualMenuItemProps.item.data as number

	const {
		currentTime,
		duration,
		playbackRate: currentPlaybackRate,
	} = useObservableStates(useCourseClassPlayerStore(), ["currentTime", "duration", "playbackRate"])

	const text = React.useMemo(
		() =>
			`${playbackRate
				.toLocaleString(undefined, {
					minimumFractionDigits: 1,
				})
				.replace(",", ".")}x`,
		[playbackRate]
	)
	const secondaryText = `(${secondsToString((duration - currentTime) / (playbackRate as number))})`
	const checked = playbackRate === currentPlaybackRate

	const item: IContextualMenuItem = {
		key: playbackRate.toString(),
		text,
		secondaryText,
		checked,
		canCheck: true,
	}

	return <ContextualMenuItem {...contextualMenuItemProps} item={item} onCheckmarkClick={() => {}} />
}

export const CourseClassPlayerPlaybackRateMenuItem = React.memo(CourseClassPlayerPlaybackRateMenuItemComponent)
