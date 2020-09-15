import React from "react";

const isShallowEqual = (a1: unknown[], a2: unknown[]): boolean => {
	if (a1.length !== a2.length) return false;

	return a1.every((item, index) => item === a2[index]);
};

export type MergedProperties<T, U> = {
	[K in keyof T | keyof U]: K extends keyof T ? (K extends keyof U ? U[K] | T[K] : T[K]) : never;
};

type Calculation<T, U> = [Record<string, { deps: unknown[]; result: unknown }>, MergedProperties<T, U>];

// TODO: Why use state? Fix too many renders React error
export const useMergeProps = <T extends object, U extends object>(props1: T, props2: U): MergedProperties<T, U> => {
	const [prevCalculation, setPrevCalculation] = React.useState<Calculation<T, U>>();

	const getPropsFromCalculation = (c: Calculation<T, U>[0]) =>
		Object.keys(c).reduce((res, prop) => ({ ...res, [prop]: c[prop].result }), {}) as MergedProperties<T, U>;

	const getPropCalculation = (propName: string, props: Array<T | U>) => {
		const exampleProp = (props.find((props) => propName in props) as typeof props[0])[propName as keyof object];
		const values = props.map((props) => props[propName as keyof object]) as unknown[];
		const filteredValues = props
			.filter((props) => propName in props)
			.map((props) => props[propName as keyof object]);

		if (typeof exampleProp === "function")
			return {
				deps: values,
				result: (...args: unknown[]) => {
					let result;

					values.forEach((value) => {
						if (typeof value === "function") result = value(...args);
					});

					return result;
				},
			};

		return {
			deps: values,
			result: filteredValues[filteredValues.length - 1],
		};
	};

	if (!prevCalculation) {
		const propNames = new Set([...Object.keys(props1), ...Object.keys(props2)]);
		const calculation: Record<string, { deps: unknown[]; result: unknown }> =
			(prevCalculation && prevCalculation[0]) || {};

		propNames.forEach((propName) => (calculation[propName] = getPropCalculation(propName, [props1, props2])));

		const mergedProps = getPropsFromCalculation(calculation);
		setPrevCalculation([calculation, mergedProps]);

		return mergedProps;
	} else {
		let shouldUpdate = false;
		const newCalculations: Exclude<typeof prevCalculation, undefined>[0] = {};

		const newPropNames = new Set([...Object.keys(props1), ...Object.keys(props2)]);
		const prevPropNames = Object.keys(prevCalculation[0]);

		newPropNames.forEach((newPropName) => {
			const prevPropNameIndex = prevPropNames.indexOf(newPropName);

			if (prevPropNameIndex === -1) shouldUpdate = true;

			const propValues = [props1, props2].map((arg) => (arg as object)[newPropName as keyof object]);
			if (!prevCalculation[0][newPropName] || !isShallowEqual(prevCalculation[0][newPropName].deps, propValues)) {
				shouldUpdate = true;
				newCalculations[newPropName] = getPropCalculation(newPropName, [props1, props2]);
			}
		});

		if (!shouldUpdate) return prevCalculation[1];

		const calculation = { ...prevCalculation[0], ...newCalculations };
		const mergedProps = getPropsFromCalculation(calculation);

		setPrevCalculation([calculation, mergedProps]);

		return mergedProps;
	}
};
