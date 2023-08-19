import { BehaviorSubject } from "rxjs"

export type TeachingKey = "dark-theme"

export type TeachingStatus =
	| "ready" // The TeachingKey is ready to be the next "showing" key
	| "dismissed" // The user already dismissed the TeachingKey
	| "showing" // The TeachingKey is active and showing
	| "waiting" // The TeachingKey has not been dismissed yet, but there's no active handler

export class TeachingStore {
	currentTeachingKey = new BehaviorSubject<TeachingKey | undefined>(undefined)
	teachingStatusByKey = new BehaviorSubject<Partial<Record<TeachingKey, TeachingStatus>>>({})

	setStatusFor(teachingKey: TeachingKey, status: TeachingStatus) {
		this.teachingStatusByKey.next({
			...this.teachingStatusByKey.getValue(),
			[teachingKey]: status,
		})
	}
}
