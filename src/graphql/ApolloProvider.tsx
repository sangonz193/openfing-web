import { ApolloProvider as _ApolloProvider } from "@apollo/client"
import React from "react"

import { useRefWithInitializer } from "../hooks/useRefWithInitializer"
import { createGraphqlClient } from "./createGraphQLClient"

export const ApolloProvider: React.FC = ({ children }) => (
	<_ApolloProvider client={useRefWithInitializer(createGraphqlClient).current}>{children}</_ApolloProvider>
)
