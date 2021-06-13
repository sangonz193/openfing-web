import React from "react"

import { AuthStore } from "./Auth.store"

export const AuthContext = React.createContext<AuthStore>(null as unknown as AuthStore)

const initStore = () => new AuthStore()

export const AuthProvider: React.FC = ({ children }) => (
	<AuthContext.Provider value={React.useState(initStore)[0]}>{children}</AuthContext.Provider>
)
