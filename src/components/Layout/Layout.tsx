import merge from "lodash/merge";
import React from "react";

import { useRootEventListeners } from "../../modules/RootEventListeners/useRootEventListeners";
import { Div } from "../Div";
import { Header } from "../Header";
import { Navbar } from "../Navbar";
import { LayoutContext, LayoutContextValue, LayoutOptions, SetLayoutOptions } from "./Layout.context";
import { useLayoutStyles } from "./useLayoutStyles";

export type LayoutProps = LayoutOptions & {
	children?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
	const { children } = props;
	const [overriddenLayoutOptions, setOverriddenLayoutOptions] = React.useState<SetLayoutOptions>();

	const contextValue = React.useMemo<LayoutContextValue>(() => {
		return {
			setLayoutOptions: setOverriddenLayoutOptions,
		};
	}, []);

	const layoutOptionsWithOverrides = React.useMemo(() => {
		const defaultOptions: LayoutOptions = {
			showHeader: true,
			headerTitle: "",
		};
		const options =
			typeof overriddenLayoutOptions === "function"
				? overriddenLayoutOptions({ ...props })
				: overriddenLayoutOptions;

		return merge(defaultOptions, options);
	}, [overriddenLayoutOptions, props]);

	const styles = useLayoutStyles({
		className: layoutOptionsWithOverrides?.className,
	});

	const eventListeners = useRootEventListeners();

	return (
		<LayoutContext.Provider value={contextValue}>
			<Div className={styles.wrapper} {...eventListeners}>
				<Div className={styles.contentAndHeaderContainer}>
					{layoutOptionsWithOverrides?.showHeader && (
						<Header
							title={layoutOptionsWithOverrides?.headerTitle}
							right={layoutOptionsWithOverrides?.headerRight}
						/>
					)}
					<Div className={styles.componentContainer}>{children}</Div>
				</Div>

				<Navbar />
			</Div>
		</LayoutContext.Provider>
	);
};
