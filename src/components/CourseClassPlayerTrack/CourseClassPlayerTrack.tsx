import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassPlayerTrackBase } from "./CourseClassPlayerTrack.base";
import { getStyles } from "./CourseClassPlayerTrack.styles";
import {
	CourseClassPlayerTrackProps,
	CourseClassPlayerTrackStyleProps,
	CourseClassPlayerTrackStyles,
} from "./CourseClassPlayerTrack.types";

export const CourseClassPlayerTrack = styled<
	CourseClassPlayerTrackProps,
	CourseClassPlayerTrackStyleProps,
	CourseClassPlayerTrackStyles
>(CourseClassPlayerTrackBase, getStyles, undefined, undefined, true);
