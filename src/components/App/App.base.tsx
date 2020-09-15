import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import { useRootEventListeners } from "../../modules/RootEventListeners/useRootEventListeners";
import { Navigator } from "../Navigator";
import { AppProps, AppStyleProps, AppStyles } from "./App.types";

const getClassNames = classNamesFunction<AppStyleProps, AppStyles>();

export const AppBase = (props: AppProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className });

	const eventListeners = useRootEventListeners();

	return (
		<div className={classNames.root} tabIndex={1} {...eventListeners}>
			<Navigator />
		</div>
	);
};
