import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import { Header } from "../Header";
import { NavBar } from "../NavBar";
import { LayoutContext, LayoutContextValue } from "./Layout.context";
import { LayoutOptions, LayoutProps, LayoutStyleProps, LayoutStyles } from "./Layout.types";

export const mergeLayoutOptions = (
	...options: Array<RecursivePartial<LayoutOptions>>
): RecursivePartial<LayoutOptions> => {
	if (options.length < 2) return options[0] || {};

	const firstItem = options[0];
	options.shift();

	return options.reduce<RecursivePartial<LayoutOptions>>((previousValue, currentValue) => {
		currentValue = { ...currentValue };
		const updatedOptions = { ...previousValue };

		if (updatedOptions.header !== currentValue.header)
			updatedOptions.header = {
				...updatedOptions.header,
				...currentValue.header,
			};

		return updatedOptions;
	}, firstItem);
};

const defaultLayoutOptions: RecursivePartial<LayoutOptions> = {};

const getClassNames = classNamesFunction<LayoutStyleProps, LayoutStyles>();

export const LayoutBase = (props: LayoutProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className });

	const [overriddenLayoutOptions, setOverriddenLayoutOptions] = React.useState<RecursivePartial<LayoutOptions>>({});

	const mergedOptions = React.useMemo(() => mergeLayoutOptions(defaultLayoutOptions, overriddenLayoutOptions), [
		overriddenLayoutOptions,
	]);
	const mergedOptionsRef = React.useRef<RecursivePartial<LayoutOptions>>(mergedOptions);
	mergedOptionsRef.current = mergedOptions;

	const layoutContext = React.useMemo<LayoutContextValue>(
		() => ({
			setLayoutOptions: (newOptions) => {
				setOverriddenLayoutOptions(newOptions);
			},
		}),
		[]
	);

	return (
		<LayoutContext.Provider value={layoutContext}>
			<div className={classNames.root}>
				<div className={classNames.contentContainer}>
					{mergedOptions.header?.hide ? null : (
						<Header title={mergedOptions.header?.title} right={mergedOptions.header?.right} />
					)}

					<div className={classNames.screenContainer}>{props.children}</div>
				</div>

				<NavBar />
			</div>
		</LayoutContext.Provider>
	);
};
