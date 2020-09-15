export const pick = <T, K extends keyof T>(source: T, keys: K[]): Pick<T, K> => {
	return keys.reduce<Pick<T, K>>((previousValue, currentValue) => {
		previousValue[currentValue] = source[currentValue];

		return previousValue;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}, {} as any);
};
