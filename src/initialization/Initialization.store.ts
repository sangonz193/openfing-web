import { Map } from "immutable"
import { BehaviorSubject } from "rxjs"
import { map } from "rxjs/operators"

import { getBehaviorSubject } from "../rxjs/getBehaviorSubject"
import type { ReadonlyBehaviorSubject } from "../rxjs/ReadonlyBehaviorSubject"

export const initialBlockerId = "initial-blocker"

export class InitializationStore {
	blockers = new BehaviorSubject(Map([[initialBlockerId as string, true as const]]))
	resetCallbacks = new BehaviorSubject<Array<() => void>>([])
	childrenKey = new BehaviorSubject(false)

	initializing: ReadonlyBehaviorSubject<boolean>

	listeners: Array<() => void> = []

	constructor() {
		const [initializingSubject, initializingSubjectSubscription] = getBehaviorSubject(
			this.blockers.pipe(map((value) => value.size > 0)),
			this.blockers.getValue().size > 0
		)
		this.initializing = initializingSubject
		this.listeners.push(() => initializingSubjectSubscription.unsubscribe())
	}

	block(id: string) {
		this.blockers.next(this.blockers.getValue().set(id, true))
	}

	unblock(id: string) {
		this.blockers.next(this.blockers.getValue().remove(id))
	}

	async reset() {
		const resetCallbacks = this.resetCallbacks.getValue()
		this.resetCallbacks.next([])

		this.block("reset")
		this.childrenKey.next(!this.childrenKey.getValue())
		await Promise.all(resetCallbacks.map((callback) => callback()))
		this.unblock("reset")
	}

	addResetListener(listener: () => void) {
		this.resetCallbacks.next([...this.resetCallbacks.getValue(), listener])
	}

	removeResetListener(listener: () => void) {
		const indexOf = this.resetCallbacks.getValue().indexOf(listener)

		if (indexOf >= 0) {
			this.resetCallbacks.next(this.resetCallbacks.getValue().splice(indexOf, 1))
		}
	}

	dispose() {
		this.listeners.forEach((listener) => listener())
	}
}
