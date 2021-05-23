import type { CourseClass, CourseClassLiveState } from "../remoteSchema.types"

export function getCourseClassShortDateInfo(
	courseClass: Required<
		Pick<CourseClass, "publishedAt"> &
			Record<keyof Pick<CourseClass, "liveState">, Required<Pick<CourseClassLiveState, "startDate">> | null>
	>
) {
	const { liveState, publishedAt } = courseClass

	if (liveState) {
		const { startDate } = liveState

		if (startDate) {
			const parsedStartDate = new Date(Date.parse(startDate))
			const timeFormatter = new Intl.DateTimeFormat("es-UY", {
				day: "numeric",
				month: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			})

			return timeFormatter.format(parsedStartDate)
		}

		return ""
	}

	if (publishedAt) {
		const dateTimeFormatter = new Intl.DateTimeFormat("es-UY", {
			day: "numeric",
			month: "numeric",
		})
		const parsedPublishedAt = new Date(Date.parse(publishedAt))

		return dateTimeFormatter.format(parsedPublishedAt)
	}

	return ""
}
