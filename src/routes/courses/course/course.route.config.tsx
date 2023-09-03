import type { RouteObject } from "react-router-dom"
import { useParams } from "react-router-dom"

import { appConfig } from "../../../app.config"

export type CourseParams = {
	code: string
	courseClassNumber?: string
}

export const courseRouteConfig = {
	path: `${appConfig.historyBasename}/courses/:code/:courseClassNumber?`,
	lazy: () =>
		import("./components/Course").then(({ Course }) => {
			return {
				Component: function CourseWrapper() {
					const { code, courseClassNumber } = useParams() as CourseParams
					return <Course courseClassListCode={code} courseClassNumber={courseClassNumber} />
				},
			}
		}),
} satisfies RouteObject

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

export function getCoursePath({
	code,
	courseClassNumber,
	startOnSeconds,
	endOnSeconds,
}: CourseRouteConfigGetPathParams) {
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
}
