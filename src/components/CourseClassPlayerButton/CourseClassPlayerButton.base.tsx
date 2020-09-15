import { DefaultButton } from "@fluentui/react/lib/Button";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { Text } from "@fluentui/react/lib/Text";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import {
	CourseClassPlayerButtonProps,
	CourseClassPlayerButtonStyleProps,
	CourseClassPlayerButtonStyles,
} from "./CourseClassPlayerButton.types";

const getClassNames = classNamesFunction<CourseClassPlayerButtonStyleProps, CourseClassPlayerButtonStyles>();

export const CourseClassPlayerButtonBase = (props: React.PropsWithChildren<CourseClassPlayerButtonProps>) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme });

	return (
		<DefaultButton styles={classNames.subComponentStyles.root()} {...props.buttonProps}>
			{props.iconName ? <FontIcon className={classNames.icon} iconName={props.iconName} /> : props.children}
			{props.text && <Text styles={classNames.subComponentStyles.text}>{props.text}</Text>}
		</DefaultButton>
	);
};
