import React from "react"

import { AppManager, AppProvider } from "./app"
import { AppearanceManager, AppearanceProvider } from "./appearance"
import { AuthManager, AuthProvider } from "./auth"
import { BlogManager, BlogProvider } from "./blog"
import { LayoutProvider } from "./components/Layout/LayoutProvider"
import { CourseClassPlayerManager, CourseClassPlayerProvider } from "./courseClassPlayer"
import { CourseSearchProvider } from "./courseSearch"
import { CourseSelectionManager, CourseSelectionProvider } from "./courseSelection"
import { UrqlProvider } from "./graphql/UrqlProvider"
import { InitializationProvider, useIsInitializing } from "./initialization"
import { NavigationProvider } from "./navigation"
import { withSiblings } from "./react/withSiblings"
import { withWrappers } from "./react/withWrapper"
import { RootEventListenersProvider } from "./rootEventListeners"
import { TeachingManager, TeachingProvider } from "./teaching"

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
		AuthProvider,
		UrqlProvider,
		LayoutProvider,
		BlogProvider,
	],
	withSiblings(
		[
			AppManager,
			AuthManager,
			CourseClassPlayerManager,
			CourseSelectionManager,
			AppearanceManager,
			TeachingManager,
			BlogManager,
		],
		({ Component }: { Component: React.FC }) => {
			const isInitializing = useIsInitializing()

			return isInitializing ? null : <Component />
		}
	)
)

export const renderWithContext = (Component: React.FC) => <WithWrappers Component={Component} />
