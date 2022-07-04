import { isAfter } from "date-fns"

import type { CourseClass, CourseClassLiveState } from "../remoteSchema.types"

export function getCourseClassDateInfo(
	courseClass: Required<
		Pick<CourseClass, "publishedAt"> &
			Record<
				keyof Pick<CourseClass, "liveState">,
				Required<Pick<CourseClassLiveState, "startDate" | "inProgress">> | null
			>
	>
) {
	const { liveState, publishedAt } = courseClass

	if (liveState) {
		const { startDate, inProgress } = liveState

		if (startDate) {
			const parsedStartDate = new Date(Date.parse(startDate))

			if (inProgress) {
				const timeFormatter = new Intl.DateTimeFormat("es-UY", {
					hour: "2-digit",
					minute: "2-digit",
				})

				return `Emitiendo desde ${timeFormatter.format(parsedStartDate)}.`
			}

			if (isAfter(parsedStartDate, new Date())) {
				return `Se emitirá el ${parsedStartDate
					.getDate()
					.toString()
					.padStart(2, "0")} de ${new Intl.DateTimeFormat("es-UY", {
					month: "long",
				})
					.format(parsedStartDate)
					.toLowerCase()} de ${parsedStartDate.getFullYear()}.`
			}

			return `Emitido el ${parsedStartDate.getDate().toString().padStart(2, "0")} de ${new Intl.DateTimeFormat(
				"es-UY",
				{
					month: "long",
				}
			)
				.format(parsedStartDate)
				.toLowerCase()} de ${parsedStartDate.getFullYear()}.`
		}

		return ""
	}

	if (publishedAt) {
		const parsedPublishedAt = new Date(Date.parse(publishedAt))

		return `Publicado el ${parsedPublishedAt.getDate().toString().padStart(2, "0")} de ${new Intl.DateTimeFormat(
			"es-UY",
			{
				month: "long",
			}
		)
			.format(parsedPublishedAt)
			.toLowerCase()} de ${parsedPublishedAt.getFullYear()}.`
	}

	return ""
}
