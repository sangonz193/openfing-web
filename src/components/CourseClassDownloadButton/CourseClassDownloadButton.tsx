import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassDownloadButtonBase } from "./CourseClassDownloadButton.base";
import { getStyles } from "./CourseClassDownloadButton.styles";
import {
	CourseClassDownloadButtonProps,
	CourseClassDownloadButtonStyleProps,
	CourseClassDownloadButtonStyles,
} from "./CourseClassDownloadButton.types";

export const CourseClassDownloadButton = styled<
	CourseClassDownloadButtonProps,
	CourseClassDownloadButtonStyleProps,
	CourseClassDownloadButtonStyles
>(CourseClassDownloadButtonBase, getStyles, undefined, undefined, true);
