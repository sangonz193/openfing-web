import { AppStyleProps, AppStyles } from "./App.types";

export const getStyles = (props: AppStyleProps): AppStyles => {
	const { className } = props;

	return {
		root: [className, { flex: 1, height: "100%" }],
	};
};
