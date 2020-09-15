import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassPlayerControlsBottomControlsBase } from "./CourseClassPlayerControlsBottomControls.base";
import { getStyles } from "./CourseClassPlayerControlsBottomControls.styles";
import {
	CourseClassPlayerControlsBottomControlsProps,
	CourseClassPlayerControlsBottomControlsStyleProps,
	CourseClassPlayerControlsBottomControlsStyles,
} from "./CourseClassPlayerControlsBottomControls.types";

export const CourseClassPlayerControlsBottomControls = styled<
	CourseClassPlayerControlsBottomControlsProps,
	CourseClassPlayerControlsBottomControlsStyleProps,
	CourseClassPlayerControlsBottomControlsStyles
>(CourseClassPlayerControlsBottomControlsBase, getStyles, undefined, undefined, true);
