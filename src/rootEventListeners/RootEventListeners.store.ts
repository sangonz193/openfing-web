import { hasProperty } from "@sangonz193/utils/hasProperty"
import { BehaviorSubject } from "rxjs"
import { map } from "rxjs/operators"

import { getBehaviorSubject } from "../rxjs/getBehaviorSubject"
import type { ReadonlyBehaviorSubject } from "../rxjs/ReadonlyBehaviorSubject"

export type EventsMap = Required<Omit<React.DOMAttributes<Element>, "children" | "dangerouslySetInnerHTML" | "css">>

export class RootEventListenersStore {
	listenersMap = new BehaviorSubject<{ [K in keyof EventsMap]?: Array<EventsMap[K]> }>({})
	listeners: ReadonlyBehaviorSubject<Partial<EventsMap>>

	private disposables: Array<() => void> = []

	constructor() {
		const [listenersSubject, listenersSubjectSubscriptions] = getBehaviorSubject<Partial<EventsMap>>(
			this.listenersMap.pipe(
				map((newValue) => {
					const entries =
						(Object.entries(newValue) as unknown as Array<
							Exclude<
								{
									[K in keyof typeof newValue]: [K, Exclude<(typeof newValue)[K], undefined>]
								}[keyof typeof newValue],
								undefined
							>
						>) || []
					return entries.reduce<Partial<EventsMap>>((res, [key, listeners]) => {
						res[key] = (event: unknown, ...restArgs: any[]) => {
							let i = 0

							while (
								i < listeners.length &&
								(typeof event !== "object" ||
									!event ||
									!hasProperty(event, "isPropagationStopped") ||
									typeof event.isPropagationStopped !== "function" ||
									!event.isPropagationStopped())
							) {
								const listener = listeners[i]
								;(listener as any)(event, ...restArgs)
								i++
							}
						}

						return res
					}, {})
				})
			),
			{}
		)
		this.listeners = listenersSubject
		this.disposables.push(() => listenersSubjectSubscriptions.unsubscribe())
	}

	addListener<T extends keyof EventsMap>(event: T, listener: EventsMap[T]) {
		const listenersMap = this.listenersMap.getValue()
		const listeners = listenersMap[event]

		this.listenersMap.next({
			...listenersMap,
			[event]: [...((listeners || []) as []), listener],
		})
	}

	removeListener<T extends keyof EventsMap>(event: T, listener: EventsMap[T]) {
		const listenersMap = this.listenersMap.getValue()
		const listeners = listenersMap[event]
		const listenerIndex = listeners?.indexOf(listener) ?? -1

		if (listenerIndex >= 0) {
			listeners?.splice(listenerIndex, 1)
		}

		if (listeners) {
			this.listenersMap.next({
				...listenersMap,
				[event]: listeners,
			})
		}
	}

	dispose() {
		this.disposables.forEach((disposable) => disposable())
	}
}
