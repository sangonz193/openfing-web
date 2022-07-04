import type { SafeOmit } from "@sangonz193/utils/SafeOmit"
import type { Observable, Subscription } from "rxjs"
import { BehaviorSubject } from "rxjs"

export function getBehaviorSubject<T>(
	observable: Observable<T>,
	defaultValue: T
): [SafeOmit<BehaviorSubject<T>, "next">, Subscription] {
	const subject = new BehaviorSubject(defaultValue)
	const dispose = observable.subscribe(subject)

	return [subject, dispose]
}
