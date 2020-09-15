import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassShareButtonBase } from "./CourseClassShareButton.base";
import { getStyles } from "./CourseClassShareButton.styles";
import {
	CourseClassShareButtonProps,
	CourseClassShareButtonStyleProps,
	CourseClassShareButtonStyles,
} from "./CourseClassShareButton.types";

export const CourseClassShareButton = styled<
	CourseClassShareButtonProps,
	CourseClassShareButtonStyleProps,
	CourseClassShareButtonStyles
>(CourseClassShareButtonBase, getStyles, undefined, undefined, true);
