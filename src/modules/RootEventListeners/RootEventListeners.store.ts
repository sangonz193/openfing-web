import { computed, observable } from "mobx";

export type EventsMap = Required<Omit<React.DOMAttributes<Element>, "children" | "dangerouslySetInnerHTML" | "css">>;

export class RootEventListenersStore {
	@observable listenersMap = new Map<keyof EventsMap, Array<EventsMap[keyof EventsMap]>>();

	@computed get listeners(): Partial<EventsMap> {
		const entries = [...this.listenersMap.entries()];

		return entries.reduce<Partial<EventsMap>>((res, [key, listeners]) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			res[key] = (event: any) => {
				listeners.forEach((listener) => {
					listener(event);
				});
			};

			return res;
		}, {});
	}

	addListener<T extends keyof EventsMap>(event: T, listener: EventsMap[T]) {
		const listeners = this.listenersMap.get(event);

		this.listenersMap.set(event, [...(listeners || []), listener]);
	}

	removeListener<T extends keyof EventsMap>(event: T, listener: EventsMap[T]) {
		const listeners = [...(this.listenersMap.get(event) || [])];
		const listenerIndex = listeners.indexOf(listener);

		if (listenerIndex >= 0) listeners.splice(listenerIndex, 1);

		this.listenersMap.set(event, listeners);
	}
}
