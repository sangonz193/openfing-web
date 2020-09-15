import { useLocalStore } from "mobx-react-lite";

import { useObserveProperties } from "../../hooks/useObserveProperties";
import { useInitializationStore } from "./useInitializationStore";

export const useIsInitializing = () => {
	const store = useInitializationStore();

	return useObserveProperties(
		useLocalStore(
			(source) => {
				const { store } = source;

				return {
					get isInitializing() {
						return store.blockers > 0;
					},
				};
			},
			{ store }
		),
		["isInitializing"]
	).isInitializing;
};
