import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassPlayerShowChaptersButtonBase } from "./CourseClassPlayerShowChaptersButton.base";
import { getStyles } from "./CourseClassPlayerShowChaptersButton.styles";
import {
	CourseClassPlayerShowChaptersButtonProps,
	CourseClassPlayerShowChaptersButtonStyleProps,
	CourseClassPlayerShowChaptersButtonStyles,
} from "./CourseClassPlayerShowChaptersButton.types";

export const CourseClassPlayerShowChaptersButton = styled<
	CourseClassPlayerShowChaptersButtonProps,
	CourseClassPlayerShowChaptersButtonStyleProps,
	CourseClassPlayerShowChaptersButtonStyles
>(CourseClassPlayerShowChaptersButtonBase, getStyles, undefined, undefined, true);
