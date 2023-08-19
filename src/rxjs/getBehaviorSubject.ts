import type { Observable, Subscription } from "rxjs"
import { BehaviorSubject } from "rxjs"

import type { ReadonlyBehaviorSubject } from "./ReadonlyBehaviorSubject"

export function getBehaviorSubject<T>(
	observable: Observable<T>,
	defaultValue: T
): [ReadonlyBehaviorSubject<T>, Subscription] {
	const subject = new BehaviorSubject(defaultValue)
	const dispose = observable.subscribe(subject)

	return [subject, dispose]
}
