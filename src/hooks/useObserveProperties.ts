import { comparer, reaction } from "mobx";
import { useAsObservableSource } from "mobx-react-lite";
import React from "react";

import { pick } from "../_utils/pick";

const getReaction = <TStore extends {}, TKeys extends keyof TStore>(
	observableStoreWrapper: { store: TStore },
	keys: TKeys[],
	onResult: (res: Pick<TStore, TKeys>) => void
) =>
	reaction(
		() => {
			const { store } = observableStoreWrapper;

			return keys.map((k) => store[k]);
		},
		() => {
			onResult(pick(observableStoreWrapper.store, keys));
		},
		{
			equals: comparer.shallow,
		}
	);

export const useObserveProperties = <TStore extends {}, TKeys extends keyof TStore>(
	store: TStore,
	keys: TKeys[]
): Pick<TStore, TKeys> => {
	const [result, setResult] = React.useState<Pick<TStore, TKeys>>(() => pick(store, keys));
	const observableStoreWrapper = useAsObservableSource({ store });

	const listenerRef = React.useRef<() => void>();
	if (!listenerRef.current) listenerRef.current = getReaction(observableStoreWrapper, keys, setResult);

	React.useEffect(() => {
		return () => listenerRef.current?.();
	}, []);

	return result;
};
