import { ReactiveVar, useReactiveVar } from "@apollo/client";
import React from "react";

export const useReactiveVars = <TKeys extends keyof any, TStore extends { [K in TKeys]: ReactiveVar<any> }>(
	store: TStore,
	keys: TKeys[]
): { [K in keyof typeof store]: typeof store[K] extends ReactiveVar<infer TValue> ? TValue : never } => {
	const result: {
		[K in keyof typeof store]: typeof store[K] extends ReactiveVar<infer TValue> ? TValue : never;
	} = {} as any;
	const values = keys.map((key) => {
		const value = useReactiveVar(store[key]);
		result[key] = value as any;

		return value;
	});

	return React.useMemo(() => result, values);
};
