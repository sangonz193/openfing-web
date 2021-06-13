import React from "react"

import { withSiblings } from "./_utils/withSiblings"
import { withWrappers } from "./_utils/withWrapper"
import { ApolloProvider } from "./graphql/ApolloProvider"
import { AppManager, AppProvider } from "./modules/App"
import { AppearanceManager, AppearanceProvider } from "./modules/Appearance"
import { AuthProvider } from "./modules/Auth"
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
		ApolloProvider,
		AuthProvider,
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
