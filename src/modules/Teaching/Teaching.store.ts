import { observable } from "mobx";

export type TeachingKey = "dark-theme";

export type TeachingStatus =
	| "ready" // The TeachingKey is ready to be the next "showing" key
	| "dismissed" // The user already dismissed the TeachingKey
	| "showing" // The TeachingKey is active and showing
	| "waiting"; // The TeachingKey has not been dismissed yet, but there's no active handler

export class TeachingStore {
	@observable currentTeachingKey: TeachingKey | undefined;
	@observable teachingStatusByKey: Map<TeachingKey, TeachingStatus> = new Map();

	setStatusFor(teachingKey: TeachingKey, status: TeachingStatus) {
		this.teachingStatusByKey.set(teachingKey, status);
	}
}
