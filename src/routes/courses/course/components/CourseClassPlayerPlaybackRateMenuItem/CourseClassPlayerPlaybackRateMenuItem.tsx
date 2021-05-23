import "../../../../../components/Icon/Checkmark.icon"

import { ContextualMenuItem, IContextualMenuItem, IContextualMenuItemProps } from "@fluentui/react"
import React from "react"

import { secondsToString } from "../../../../../_utils/secondsToString"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"

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
	} = useReactiveVars(useCourseClassPlayerStore(), ["currentTime", "duration", "playbackRate"])

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
