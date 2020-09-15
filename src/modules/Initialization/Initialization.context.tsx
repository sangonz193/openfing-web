import React from "react";

import { useObserveProperties } from "../../hooks/useObserveProperties";
import { InitializationStore } from "./Initialization.store";

export const InitializationContext = React.createContext<InitializationStore>((null as unknown) as InitializationStore);

const initStore = () => new InitializationStore();

export const InitializationProvider: React.FC = ({ children }) => {
	const [store] = React.useState(initStore);

	React.useState(() => {
		store.block();

		setTimeout(() => store.unblock());
	});

	const { childrenKey } = useObserveProperties(store, ["childrenKey"]);

	return (
		<InitializationContext.Provider key={childrenKey.toString()} value={store}>
			{children}
		</InitializationContext.Provider>
	);
};
