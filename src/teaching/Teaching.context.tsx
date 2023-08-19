import React from "react"

import { useRefWithInitializer } from "../hooks/useRefWithInitializer"
import { TeachingStore } from "./Teaching.store"

export const TeachingContext = React.createContext<TeachingStore>(null as unknown as TeachingStore)

export const TeachingProvider: React.FC = ({ children }) => {
	const store = useRefWithInitializer(() => new TeachingStore()).current

	return <TeachingContext.Provider value={store}>{children}</TeachingContext.Provider>
}
