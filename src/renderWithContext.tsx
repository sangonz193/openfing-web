import { ApolloProvider } from "@apollo/client"
import React from "react"

import { withSiblings } from "./_utils/withSiblings"
import { withWrappers } from "./_utils/withWrapper"
import { createGraphqlClient } from "./graphql/createGraphQLClient"
import { useRefWithInitializer } from "./hooks/useRefWithInitializer"
import { AppManager, AppProvider } from "./modules/App"
import { AppearanceManager, AppearanceProvider } from "./modules/Appearance"
import { CourseClassPlayerManager, CourseClassPlayerProvider } from "./modules/CourseClassPlayer"
import { CourseSearchProvider } from "./modules/CourseSearch"
import { CourseSelectionManager, CourseSelectionProvider } from "./modules/CourseSelection"
import { InitializationProvider, useIsInitializing } from "./modules/Initialization"
import { NavigationProvider } from "./modules/Navigation"
import { RootEventListenersProvider } from "./modules/RootEventListeners"
import { TeachingManager, TeachingProvider } from "./modules/Teaching"

const WithWrappers = withWrappers(
	[
		React.StrictMode,
		InitializationProvider,
		RootEventListenersProvider,
		AppProvider,
		CourseSelectionProvider,
		CourseClassPlayerProvider,
		AppearanceProvider,
		TeachingProvider,
		CourseSearchProvider,
		NavigationProvider,
		({ children }) => (
			<ApolloProvider client={useRefWithInitializer(createGraphqlClient).current}>{children}</ApolloProvider>
		),
	],
	withSiblings(
		[AppManager, CourseClassPlayerManager, CourseSelectionManager, AppearanceManager, TeachingManager],
		({ Component }: { Component: React.FC }) => {
			const isInitializing = useIsInitializing()

			return isInitializing ? null : <Component />
		}
	)
)

export const renderWithContext = (Component: React.FC) => <WithWrappers Component={Component} />
