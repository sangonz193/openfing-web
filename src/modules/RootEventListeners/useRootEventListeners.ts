import { useLocalStore } from "mobx-react-lite";

import { useObserveProperties } from "../../hooks/useObserveProperties";
import { useRootEventListenersStore } from "./useRootEventListenersStore";

export const useRootEventListeners = () => {
	const store = useRootEventListenersStore();

	return useObserveProperties(
		useLocalStore(
			(source) => {
				const { store } = source;

				return {
					get listeners() {
						return store.listeners;
					},
				};
			},
			{ store }
		),
		["listeners"]
	).listeners;
};
