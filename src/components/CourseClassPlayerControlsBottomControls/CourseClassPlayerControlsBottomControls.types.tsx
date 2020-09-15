import type { IButtonStyles } from "@fluentui/react/lib/Button";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

import type { CourseClassPlayerButtonProps } from "../CourseClassPlayerButton";

export type CourseClassPlayerControlsBottomControlsProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<
		CourseClassPlayerControlsBottomControlsStyleProps,
		CourseClassPlayerControlsBottomControlsStyles
	>;
};

export type CourseClassPlayerControlsBottomControlsStyleProps = {
	visible: boolean;
	theme: ITheme;
	className?: string;
};

export type CourseClassPlayerControlsBottomControlsStyles = {
	root: IStyle;
	buttonsContainer: IStyle;

	subComponentStyles: {
		button: IButtonStyles;
		returnButton: Required<CourseClassPlayerButtonProps>["styles"];
	};
};
