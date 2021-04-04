import { DefaultButton, IButtonProps, Text } from "@fluentui/react"
import React from "react"

import { secondsToString } from "../../../../../_utils/secondsToString"
import { Div } from "../../../../../components/Div"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
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
	const { currentTime, duration } = useReactiveVars(useCourseClassPlayerStore(), ["currentTime", "duration"])

	const [showTimeLeft, setShowTimeLeft] = React.useState(false)
	const handleTimeLeftClick = React.useCallback<Required<IButtonProps>["onClick"]>((e) => {
		e.preventDefault()
		setShowTimeLeft((value) => !value)
	}, [])

	return (
		<Div className={styles.wrapper}>
			<div className={styles.startTimeWrapper}>
				<Text className={styles.startTime}>{secondsToString(currentTime || 0)}</Text>
			</div>

			<CourseClassPlayerTrackSlider />

			<DefaultButton className={styles.endTimeWrapper} onClick={handleTimeLeftClick}>
				<Text className={styles.endTime}>
					{showTimeLeft
						? secondsToString((duration || 0) - (currentTime || 0))
						: secondsToString(duration || 0)}
				</Text>
			</DefaultButton>
		</Div>
	)
}

export const CourseClassPlayerTrack = React.memo(CourseClassPlayerTrackComponent)
