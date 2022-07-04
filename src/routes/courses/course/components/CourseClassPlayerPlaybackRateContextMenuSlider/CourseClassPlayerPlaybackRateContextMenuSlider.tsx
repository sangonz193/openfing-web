import { Slider, Stack, Text } from "@fluentui/react"
import throttle from "lodash/throttle"
import React from "react"

import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { useRefWithInitializer } from "../../../../../hooks/useRefWithInitializer"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useCourseClassPlayerPlaybackRateContextMenuSliderStyles } from "./useCourseClassPlayerPlaybackRateContextMenuSliderStyles"

export type CourseClassPlayerPlaybackRateContextMenuSliderProps = {
	children?: undefined
	className?: string
}

const CourseClassPlayerPlaybackRateContextMenuSliderComponent: React.FC<CourseClassPlayerPlaybackRateContextMenuSliderProps> =
	({ className }) => {
		const styles = useCourseClassPlayerPlaybackRateContextMenuSliderStyles({
			className,
		})
		const courseClassPlayerStore = useCourseClassPlayerStore()
		const { playbackRate } = useObservableStates(courseClassPlayerStore, ["playbackRate"])
		const [localValue, setLocalValue] = React.useState(playbackRate)
		const [dragging, setDragging] = React.useState(false)

		const throttleSetPlaybackRate = useRefWithInitializer(() =>
			throttle((v: number) => courseClassPlayerStore.setPlaybackRate(v), 50)
		).current

		React.useEffect(() => {
			if (!dragging) {
				setLocalValue(playbackRate)
			}
		}, [playbackRate, dragging])

		const handleSliderChange = React.useCallback((value: number) => {
			setDragging(true)
			setLocalValue(value)
			throttleSetPlaybackRate(value)
		}, [])

		const handleSliderChanged = React.useCallback(() => {
			setDragging(false)
		}, [])

		const valueToShow = dragging ? localValue : playbackRate

		return (
			<Stack className={styles.wrapper}>
				<Stack horizontal>
					<Text className={styles.text}>
						{valueToShow.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace(",", ".")}x
					</Text>
				</Stack>

				<Slider
					className={styles.slider}
					min={0.25}
					max={2}
					step={0.05}
					value={valueToShow}
					showValue={false}
					onChange={handleSliderChange}
					onChanged={handleSliderChanged}
				/>
			</Stack>
		)
	}

export const CourseClassPlayerPlaybackRateContextMenuSlider = React.memo(
	CourseClassPlayerPlaybackRateContextMenuSliderComponent
)
