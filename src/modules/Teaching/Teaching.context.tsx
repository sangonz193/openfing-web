import React from "react";

import { TeachingStore } from "./Teaching.store";

export const TeachingContext = React.createContext<TeachingStore>((null as unknown) as TeachingStore);

export const TeachingProvider: React.FC = ({ children }) => {
	const [store] = React.useState<TeachingStore>(() => new TeachingStore());

	return <TeachingContext.Provider value={store}>{children}</TeachingContext.Provider>;
};
