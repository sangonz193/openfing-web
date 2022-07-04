import React from "react"

import { withSiblings } from "./_utils/withSiblings"
import { withWrappers } from "./_utils/withWrapper"
import { LayoutProvider } from "./components/Layout/LayoutProvider"
import { UrqlProvider } from "./graphql/UrqlProvider"
import { AppManager, AppProvider } from "./modules/App"
import { AppearanceManager, AppearanceProvider } from "./modules/Appearance"
import { AuthManager, AuthProvider } from "./modules/Auth"
import { BlogManager, BlogProvider } from "./modules/Blog"
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
