import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import { Header } from "../Header";
import { NavBar } from "../NavBar";
import { LayoutOptions, LayoutProps, LayoutStyleProps, LayoutStyles } from "./Layout.types";

type LayoutContextValue = {
	setLayoutOptions: (
		options:
			| RecursivePartial<LayoutOptions>
			| ((options: RecursivePartial<LayoutOptions>) => RecursivePartial<LayoutOptions>)
	) => void;
};

export type SetLayoutOptions = (
	options:
		| RecursivePartial<LayoutOptions>
		| ((options: RecursivePartial<LayoutOptions>) => RecursivePartial<LayoutOptions>)
) => void;

const LayoutContext = React.createContext<LayoutContextValue>((undefined as unknown) as LayoutContextValue);

export const useSetLayoutOptions = (
	layoutOptions: () =>
		| RecursivePartial<LayoutOptions>
		| ((options: RecursivePartial<LayoutOptions>) => RecursivePartial<LayoutOptions>)
) => {
	const context = React.useContext(LayoutContext);

	React.useMemo(() => context.setLayoutOptions(layoutOptions()), [layoutOptions]);
};

type OptionsReducerAction =
	| {
			type: "reset";
	  }
	| {
			type: "update";
			newOptions: RecursivePartial<LayoutOptions>;
	  };

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
const optionsReducer: React.Reducer<RecursivePartial<LayoutOptions>, OptionsReducerAction> = (prevState, action) => {
	if (action.type === "reset") return { ...defaultLayoutOptions, header: { ...defaultLayoutOptions.header } };

	return mergeLayoutOptions(prevState, action.newOptions);
};

const getClassNames = classNamesFunction<LayoutStyleProps, LayoutStyles>();

export const LayoutBase = (props: LayoutProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className });

	const [options, dispatchOptions] = React.useReducer(optionsReducer, defaultLayoutOptions);
	const routeKeyRef = React.useRef<string>();
	const mergedOptions = React.useMemo(() => {
		const optionsSource = [defaultLayoutOptions];

		if (props.layoutOptions) optionsSource.push(props.layoutOptions);

		if (routeKeyRef.current === props.routeKey) optionsSource.push(options);
		else {
			dispatchOptions({ type: "reset" });
			routeKeyRef.current = props.routeKey;
		}

		return mergeLayoutOptions(...optionsSource);
	}, [options, props.layoutOptions, props.routeKey]);
	const mergedOptionsRef = React.useRef<RecursivePartial<LayoutOptions>>(mergedOptions);
	mergedOptionsRef.current = mergedOptions;

	const layoutContext = React.useMemo<LayoutContextValue>(
		() => ({
			setLayoutOptions: (newOptions) => {
				dispatchOptions({
					type: "update",
					newOptions: typeof newOptions === "function" ? newOptions(mergedOptionsRef.current) : newOptions,
				});
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
