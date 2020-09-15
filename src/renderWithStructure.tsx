import { ApolloProvider } from "@apollo/client";
import { createBrowserHistory } from "history";
import { observable } from "mobx";
import PiwikReactRouter from "piwik-react-router";
import React from "react";
import ReactGA from "react-ga";

import { withSiblings } from "./_utils/withSiblings";
import { withWrappers } from "./_utils/withWrapper";
import { appConfig } from "./appConfig";
import { createGraphqlClient } from "./graphql/creategraphqlclient/createGraphqlClient";
import { HistoryProvider } from "./hooks/useHistory";
import { AppManager, AppProvider } from "./modules/App";
import { AppearanceManager, AppearanceProvider } from "./modules/Appearance";
import { CourseClassPlayerManager, CourseClassPlayerProvider } from "./modules/CourseClassPlayer";
import { CourseSearchProvider } from "./modules/CourseSearch";
import { CourseSelectionManager, CourseSelectionProvider } from "./modules/CourseSelection";
import { InitializationProvider, useIsInitializing } from "./modules/Initialization";
import { RootEventListenersProvider } from "./modules/RootEventListeners";
import { TeachingManager, TeachingProvider } from "./modules/Teaching";

const WithWrappers = withWrappers(
	[
		InitializationProvider,
		({ children }) => <ApolloProvider client={React.useState(createGraphqlClient)[0]}>{children}</ApolloProvider>,
		({ children }) => {
			const [observableHistory] = React.useState(() => {
				const history = createBrowserHistory({ basename: appConfig.historyBasename });
				history.listen((location1) => (observableHistory.location = location1));

				const observableHistory = observable(history);

				if (process.env.NODE_ENV === "production") {
					const piwik = PiwikReactRouter({
						siteId: 7,
						url: "https://www.fing.edu.uy/piwik",
					});
					piwik.connectToHistory(history);

					ReactGA.initialize("UA-141045691-1", {});
					history.listen(() => {
						ReactGA.pageview(window.location.pathname + window.location.search);
					});
				}

				return observableHistory;
			});

			return <HistoryProvider history={observableHistory}>{children}</HistoryProvider>;
		},
		RootEventListenersProvider,
		AppProvider,
		CourseSelectionProvider,
		CourseClassPlayerProvider,
		AppearanceProvider,
		TeachingProvider,
		CourseSearchProvider,
	],
	withSiblings(
		[AppManager, CourseClassPlayerManager, CourseSelectionManager, AppearanceManager, TeachingManager],
		(props: { Component: React.FC }) => {
			const isInitializing = useIsInitializing();

			return isInitializing ? null : <props.Component />;
		}
	)
);

export const renderWithStructure = (Component: React.FC) => <WithWrappers Component={Component} />;
