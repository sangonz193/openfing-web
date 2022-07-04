import { Link, Text } from "@fluentui/react"
import React from "react"

import { secondsToString } from "../../../../../_utils/secondsToString"
import { useLocalLinkProps } from "../../../../../hooks/useLocalLinkProps"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useCourseSelectionStore } from "../../../../../modules/CourseSelection"
import { courseRouteConfig } from "../../course.route.config"
import { useCourseClassPlayerChapterItemStyles } from "./useCourseClassPlayerChapterItemStyles"

export type CourseClassPlayerChapterItemProps = {
	children?: undefined
	className?: string
	vttCue: VTTCue
	requestClosePanel: () => void
}

const CourseClassPlayerChapterItemComponent: React.FC<CourseClassPlayerChapterItemProps> = ({
	className,
	vttCue,
	requestClosePanel,
}) => {
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const [active, setActive] = React.useState(() => {
		const currentTime = courseClassPlayerStore.currentTime.getValue()
		if (!currentTime) {
			return false
		}

		return vttCue.startTime <= currentTime && currentTime <= vttCue.endTime
	})

	React.useEffect(() => {
		const subscription = courseClassPlayerStore.activeChapterTextTracks.subscribe((newValue) => {
			const newIsActive = newValue.some((activeTextTrack) => {
				return activeTextTrack.id === vttCue.id
			})

			if (active !== newIsActive) {
				setActive(newIsActive)
			}
		})

		return () => subscription.unsubscribe()
	}, [vttCue.id, active])

	const courseSelectionStore = useCourseSelectionStore()
	const { courseClassListCode, courseClassNumber } = useObservableStates(courseSelectionStore, [
		"selection",
	]).selection

	const href = React.useMemo(
		() =>
			(courseClassListCode !== undefined &&
				courseClassNumber !== undefined &&
				courseRouteConfig.path({
					code: courseClassListCode,
					courseClassNumber,
					startOnSeconds: vttCue.startTime,
					endOnSeconds: vttCue.endTime,
				})) ||
			"",
		[courseClassListCode, courseClassNumber, vttCue.startTime, vttCue.endTime]
	)

	const handleClick = React.useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault()

			if (!e.ctrlKey && !e.metaKey) {
				courseClassPlayerStore.setCurrentTime(vttCue.startTime)
				requestClosePanel()
			} else {
				window.open(href, "__blank")
			}
		},
		[vttCue.startTime, requestClosePanel]
	)

	const styles = useCourseClassPlayerChapterItemStyles({
		className,
		active,
	})

	return (
		<Link className={styles.link} {...useLocalLinkProps({ href: href || "", onClick: handleClick })}>
			<div className={styles.activeIndicator} />

			<div>
				<Text className={styles.seconds}>{secondsToString(vttCue.startTime)}</Text>

				<br />

				<Text>{vttCue.text}</Text>
			</div>
		</Link>
	)
}

export const CourseClassPlayerChapterItem = React.memo(CourseClassPlayerChapterItemComponent)
