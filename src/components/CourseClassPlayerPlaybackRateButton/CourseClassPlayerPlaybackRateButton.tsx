import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassPlayerPlaybackRateButtonBase } from "./CourseClassPlayerPlaybackRateButton.base";
import { getStyles } from "./CourseClassPlayerPlaybackRateButton.styles";
import {
	CourseClassPlayerPlaybackRateButtonProps,
	CourseClassPlayerPlaybackRateButtonStyleProps,
	CourseClassPlayerPlaybackRateButtonStyles,
} from "./CourseClassPlayerPlaybackRateButton.types";

export const CourseClassPlayerPlaybackRateButton = styled<
	CourseClassPlayerPlaybackRateButtonProps,
	CourseClassPlayerPlaybackRateButtonStyleProps,
	CourseClassPlayerPlaybackRateButtonStyles
>(CourseClassPlayerPlaybackRateButtonBase, getStyles, undefined, undefined, true);
