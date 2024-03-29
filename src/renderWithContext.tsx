import type { PropsWithChildren, ReactNode } from "react"
import React from "react"

import { AppManager, AppProvider } from "./app"
import { AppearanceManager, AppearanceProvider } from "./appearance"
import { AuthManager, AuthProvider } from "./auth"
import { CourseClassPlayerManager, CourseClassPlayerProvider } from "./courseClassPlayer"
import { CourseSearchProvider } from "./courseSearch"
import { CourseSelectionManager, CourseSelectionProvider } from "./courseSelection"
import { UrqlProvider } from "./graphql/UrqlProvider"
import { InitializationProvider, useIsInitializing } from "./initialization"
import { withSiblings } from "./react/withSiblings"
import { withWrappers } from "./react/withWrapper"
import { RootEventListenersProvider } from "./rootEventListeners"

const WithWrappers = withWrappers(
	[
		React.StrictMode,
		InitializationProvider,
		RootEventListenersProvider,
		AppProvider,
		CourseSelectionProvider,
		CourseClassPlayerProvider,
		AppearanceProvider,
		CourseSearchProvider,
		AuthProvider,
		UrqlProvider,
	],
	withSiblings<PropsWithChildren<{}>>(
		[AppManager, AuthManager, CourseClassPlayerManager, CourseSelectionManager, AppearanceManager],
		({ children }) => {
			const isInitializing = useIsInitializing()

			return isInitializing ? null : <>{children}</>
		}
	)
)

export const renderWithContext = (children: ReactNode) => <WithWrappers>{children}</WithWrappers>
