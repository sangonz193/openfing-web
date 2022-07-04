import { appConfig } from "../../../app.config"
import type { RouteConfig } from "../../_utils/RouteConfig"
import { Course } from "./components/Course"

export type CourseRouteConfigParams = {
	code: string
	courseClassNumber?: string
}

export type CourseRouteConfigGetPathParams =
	| {
			code: string
			courseClassNumber?: number
			startOnSeconds?: undefined
			endOnSeconds?: undefined
	  }
	| {
			code: string
			courseClassNumber: number
			startOnSeconds?: number
			endOnSeconds?: undefined
	  }
	| {
			code: string
			courseClassNumber: number
			startOnSeconds: number
			endOnSeconds?: number
	  }

export const courseRouteConfig: RouteConfig<CourseRouteConfigParams, CourseRouteConfigGetPathParams> = {
	path: ({ code, courseClassNumber, startOnSeconds, endOnSeconds }) => {
		let result = `${appConfig.historyBasename}/courses/${code}`

		if (typeof courseClassNumber !== "number") {
			return result
		}
		result += `/${courseClassNumber}`

		if (typeof startOnSeconds !== "number") {
			return result
		}
		result += `?t=${startOnSeconds}`

		if (typeof endOnSeconds !== "number") {
			return result
		}
		result += `,${endOnSeconds}`

		return result
	},

	element: ({ code, courseClassNumber }) => (
		<Course courseClassListCode={code} courseClassNumber={courseClassNumber} />
	),

	matchConfig: {
		path: `${appConfig.historyBasename}/courses/:code/:courseClassNumber?`,
	},
}
