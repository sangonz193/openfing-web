import { History } from "history";
import React from "react";

type HistoryContextValue = {
	history: History;
};
const HistoryContext = React.createContext<HistoryContextValue>((undefined as unknown) as HistoryContextValue);

export type HistoryProviderProps = {
	history: History;
};
export const HistoryProvider: React.FC<HistoryProviderProps> = ({ children, history }) => {
	const value = React.useRef({ history });

	return <HistoryContext.Provider value={value.current}>{children}</HistoryContext.Provider>;
};

export const useHistory: () => History = () => React.useContext(HistoryContext).history;
