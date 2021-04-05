import { makeVar } from "@apollo/client"

export type TeachingKey = "dark-theme"

export type TeachingStatus =
	| "ready" // The TeachingKey is ready to be the next "showing" key
	| "dismissed" // The user already dismissed the TeachingKey
	| "showing" // The TeachingKey is active and showing
	| "waiting" // The TeachingKey has not been dismissed yet, but there's no active handler

export class TeachingStore {
	currentTeachingKey = makeVar<TeachingKey | undefined>(undefined)
	teachingStatusByKey = makeVar<Partial<Record<TeachingKey, TeachingStatus>>>({})

	setStatusFor(teachingKey: TeachingKey, status: TeachingStatus) {
		this.teachingStatusByKey({
			...this.teachingStatusByKey(),
			[teachingKey]: status,
		})
	}
}
