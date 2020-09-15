export const getValidPercentage: (value: number, minValue: number, maxValue: number) => number = (
	value,
	minValue,
	maxValue
) => {
	value -= minValue;
	maxValue -= minValue;

	const percentage = (value * 100) / (maxValue || 1);

	if (!Number.isFinite(percentage)) return 0;

	return Math.max(0, Math.min(percentage, 100));
};
