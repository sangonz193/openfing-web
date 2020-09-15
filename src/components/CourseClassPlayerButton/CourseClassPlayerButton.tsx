import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassPlayerButtonBase } from "./CourseClassPlayerButton.base";
import { getStyles } from "./CourseClassPlayerButton.styles";
import {
	CourseClassPlayerButtonProps,
	CourseClassPlayerButtonStyleProps,
	CourseClassPlayerButtonStyles,
} from "./CourseClassPlayerButton.types";

export const CourseClassPlayerButton = styled<
	CourseClassPlayerButtonProps,
	CourseClassPlayerButtonStyleProps,
	CourseClassPlayerButtonStyles
>(CourseClassPlayerButtonBase, getStyles, undefined, undefined, true);
