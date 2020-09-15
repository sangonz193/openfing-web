import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassPlayerVolumeButtonBase } from "./CourseClassPlayerVolumeButton.base";
import { getStyles } from "./CourseClassPlayerVolumeButton.styles";
import {
	CourseClassPlayerVolumeButtonProps,
	CourseClassPlayerVolumeButtonStyleProps,
	CourseClassPlayerVolumeButtonStyles,
} from "./CourseClassPlayerVolumeButton.types";

export const CourseClassPlayerVolumeButton = styled<
	CourseClassPlayerVolumeButtonProps,
	CourseClassPlayerVolumeButtonStyleProps,
	CourseClassPlayerVolumeButtonStyles
>(CourseClassPlayerVolumeButtonBase, getStyles, undefined, undefined, true);
