import { secondsToString } from "../../../../../courseClassPlayer/secondsToString"

export type CourseClassShareModalReducerState = {
	startOn: boolean
	startOnSeconds: number
	startOnInputValue: string
	endOn: boolean
	endOnSeconds: number
	endOnInputValue: string

	courseClassListCode?: string
	courseClassNo?: number
}

type CourseClassShareModalReducerAction =
	| {
			type: "toggle-start-on" | "toggle-end-on" | "calculate-url"
	  }
	| {
			type: "reset"
			seconds: number | undefined
			courseClassListCode: string | undefined
			courseClassNo: number | undefined
	  }
	| {
			type: "update-start-on-input-value" | "update-end-on-input-value"
			value: string
	  }

export const initCourseClassShareModalReducer = (options: {
	seconds: number | undefined
	courseClassListCode: string | undefined
	courseClassNo: number | undefined
}): CourseClassShareModalReducerState => {
	const { courseClassListCode, courseClassNo } = options

	const seconds = Math.floor(options.seconds || 0)
	const endOnSeconds = seconds + 1

	return {
		startOn: false,
		startOnSeconds: seconds,
		startOnInputValue: secondsToString(seconds),
		endOn: false,
		endOnSeconds,
		endOnInputValue: secondsToString(endOnSeconds),
		courseClassListCode,
		courseClassNo,
	}
}

export const courseClassShareModalReducer: React.Reducer<
	CourseClassShareModalReducerState,
	CourseClassShareModalReducerAction
> = (prevState, action): CourseClassShareModalReducerState => {
	if (action.type === "toggle-start-on") {
		return {
			...prevState,
			startOn: !prevState.startOn,
			...(prevState.startOn && {
				endOn: false,
			}),
		}
	}

	if (action.type === "toggle-end-on") {
		if (prevState.endOn || prevState.startOn) {
			return {
				...prevState,
				endOn: !prevState.endOn,
			}
		}

		return prevState
	}

	if (action.type === "update-start-on-input-value") {
		return {
			...prevState,
			startOnInputValue: action.value,
		}
	}

	if (action.type === "update-end-on-input-value") {
		return {
			...prevState,
			endOnInputValue: action.value,
		}
	}

	if (action.type === "reset") {
		return initCourseClassShareModalReducer(action)
	}

	if (action.type === "calculate-url") {
		const getSecondsFromArray = (array: string[]): number | undefined => {
			let result: number | undefined

			if (array.length === 1) {
				const parsedSeconds = Number(array[0])

				if (!Number.isNaN(parsedSeconds)) {
					result = parsedSeconds
				}
			} else if (array.length === 2) {
				const parsedMinutes = Number(array[0])
				const parsedSeconds = Number(array[1])

				result = Number.isNaN(parsedMinutes)
					? undefined
					: parsedMinutes * 60 + (Number.isNaN(parsedSeconds) ? 0 : parsedSeconds)
			} else if (array.length > 2) {
				const parsedHours = Number(array[0])
				const parsedMinutes = Number(array[1])
				const parsedSeconds = Number(array[2])

				result = Number.isNaN(parsedHours)
					? undefined
					: parsedHours * 60 * 60 +
					  (Number.isNaN(parsedMinutes)
							? 0
							: parsedMinutes * 60 + (Number.isNaN(parsedSeconds) ? 0 : parsedSeconds))
			}

			return result
		}

		let startOnValue = prevState.startOnInputValue.trim()
		let startOnSeconds = getSecondsFromArray(startOnValue.length === 0 ? [] : startOnValue.split(":"))

		if (startOnSeconds !== undefined) {
			startOnSeconds = Math.floor(startOnSeconds)
		} else {
			startOnSeconds = 0
		}
		startOnValue = secondsToString(startOnSeconds)

		let endOnValue = prevState.endOnInputValue.trim()
		let endOnSeconds = getSecondsFromArray(endOnValue.length === 0 ? [] : endOnValue.split(":"))

		if (endOnSeconds !== undefined) {
			endOnSeconds = Math.floor(endOnSeconds)
		} else {
			endOnSeconds = startOnSeconds
		}
		endOnSeconds = Math.max(startOnSeconds + 1, endOnSeconds)

		endOnValue = secondsToString(endOnSeconds)

		return {
			...prevState,
			startOnInputValue: startOnValue,
			startOnSeconds,
			endOnInputValue: endOnValue,
			endOnSeconds,
		}
	}

	return initCourseClassShareModalReducer({
		seconds: undefined,
		courseClassListCode: prevState.courseClassListCode,
		courseClassNo: prevState.courseClassNo,
	})
}
