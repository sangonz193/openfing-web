import { Text } from "@fluentui/react/lib/Text";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import { HeaderProps, HeaderStyleProps, HeaderStyles } from "./Header.types";

const getClassNames = classNamesFunction<HeaderStyleProps, HeaderStyles>();

export const HeaderBase = (props: HeaderProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme });

	const { title, right } = props;

	return (
		<div className={classNames.root}>
			{title && typeof title === "string" ? (
				<Text as="h2" className={classNames.title}>
					{title}
				</Text>
			) : typeof title === "function" ? (
				(title as () => {})()
			) : (
				title
			)}

			{right}
		</div>
	);
};
