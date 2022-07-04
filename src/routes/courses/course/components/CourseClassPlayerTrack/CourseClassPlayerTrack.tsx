import type { IButtonProps } from "@fluentui/react"
import { DefaultButton, Stack, Text } from "@fluentui/react"
import React from "react"

import { secondsToString } from "../../../../../_utils/secondsToString"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useIsPlayerLoaded } from "../../hooks/useIsPlayerLoaded"
import { CourseClassPlayerTrackSlider } from "../CourseClassPlayerTrackSlider"
import { useCourseClassPlayerTrackStyles } from "./useCourseClassPlayerTrackStyles"

export type CourseClassPlayerTrackProps = {
	children?: undefined
	className?: string
}

const CourseClassPlayerTrackComponent: React.FC<CourseClassPlayerTrackProps> = ({ className }) => {
	const styles = useCourseClassPlayerTrackStyles({
		className,
	})
	const { currentTime, duration } = useObservableStates(useCourseClassPlayerStore(), ["currentTime", "duration"])

	const [showTimeLeft, setShowTimeLeft] = React.useState(false)
	const handleTimeLeftClick = React.useCallback<Required<IButtonProps>["onClick"]>((e) => {
		e.preventDefault()
		setShowTimeLeft((value) => !value)
	}, [])
	const isPlayerLoaded = useIsPlayerLoaded()

	return (
		<Stack className={styles.wrapper}>
			<div className={styles.startTimeWrapper}>
				<Text className={styles.startTime}>{secondsToString(currentTime || 0)}</Text>
			</div>

			<CourseClassPlayerTrackSlider />

			<DefaultButton disabled={!isPlayerLoaded} className={styles.endTimeWrapper} onClick={handleTimeLeftClick}>
				<Text className={styles.endTime}>
					{showTimeLeft
						? secondsToString((duration || 0) - (currentTime || 0))
						: secondsToString(duration || 0)}
				</Text>
			</DefaultButton>
		</Stack>
	)
}

export const CourseClassPlayerTrack = React.memo(CourseClassPlayerTrackComponent)
