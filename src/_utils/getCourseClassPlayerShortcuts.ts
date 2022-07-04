import type keyboardKey from "keyboard-key"

import type { CourseClassPlayerStore } from "../modules/CourseClassPlayer"

export const getCourseClassPlayerShortcuts = (
	courseClassPlayerStore: CourseClassPlayerStore
): Partial<Record<keyof typeof keyboardKey, () => void | boolean>> => {
	const rewind = () =>
		courseClassPlayerStore.setCurrentTime((courseClassPlayerStore.currentTime.getValue() || 0) - 10)
	const forward = () =>
		courseClassPlayerStore.setCurrentTime((courseClassPlayerStore.currentTime.getValue() || 0) + 10)
	const togglePlay = () => courseClassPlayerStore.togglePlay()
	const getHandleNumber = (number: number) => () => {
		const duration = courseClassPlayerStore.duration.getValue()
		if (duration) {
			courseClassPlayerStore.setCurrentTime(number * (duration / 10))
		}
	}

	return {
		ArrowLeft: rewind,
		j: rewind,
		ArrowRight: forward,
		l: forward,
		ArrowUp: () =>
			courseClassPlayerStore.setVolume(
				Math.floor(Math.max(0, Math.min(10, (courseClassPlayerStore.volume.getValue() || 0) * 10 + 1))) / 10
			),
		ArrowDown: () =>
			courseClassPlayerStore.setVolume(
				Math.floor(Math.max(0, Math.min(10, (courseClassPlayerStore.volume.getValue() || 0) * 10 - 1))) / 10
			),
		" ": togglePlay,
		Spacebar: togglePlay,
		k: togglePlay,
		"+": () => courseClassPlayerStore.setPlaybackRate((courseClassPlayerStore.playbackRate.getValue() || 0) + 0.25),
		"-": () => courseClassPlayerStore.setPlaybackRate((courseClassPlayerStore.playbackRate.getValue() || 0) - 0.25),
		"*": () => courseClassPlayerStore.setPlaybackRate(1),
		Home: () => courseClassPlayerStore.setCurrentTime(0),
		End: () => courseClassPlayerStore.setCurrentTime(courseClassPlayerStore.duration.getValue() || 0),
		f: () => {
			if (courseClassPlayerStore.loaded.getValue()) {
				courseClassPlayerStore.toggleFullscreen()
				courseClassPlayerStore.htmlVideoWrapperElement.getValue()?.focus()
			}
		},
		"0": getHandleNumber(0),
		Digit0: getHandleNumber(0),
		"1": getHandleNumber(1),
		Digit1: getHandleNumber(1),
		"2": getHandleNumber(2),
		Digit2: getHandleNumber(2),
		"3": getHandleNumber(3),
		Digit3: getHandleNumber(3),
		"4": getHandleNumber(4),
		Digit4: getHandleNumber(4),
		"5": getHandleNumber(5),
		Digit5: getHandleNumber(5),
		"6": getHandleNumber(6),
		Digit6: getHandleNumber(6),
		"7": getHandleNumber(7),
		Digit7: getHandleNumber(7),
		"8": getHandleNumber(8),
		Digit8: getHandleNumber(8),
		"9": getHandleNumber(9),
		Digit9: getHandleNumber(9),
	}
}
