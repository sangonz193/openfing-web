import React from "react";

import { LayoutOptions } from "../components/Layout";
import { LayoutContext } from "../components/Layout/Layout.context";

export const useLayoutOptions = (getOptions: () => RecursivePartial<LayoutOptions>) => {
	const { setLayoutOptions } = React.useContext(LayoutContext);

	React.useEffect(() => {
		setLayoutOptions(getOptions());
	}, [getOptions]);
};
