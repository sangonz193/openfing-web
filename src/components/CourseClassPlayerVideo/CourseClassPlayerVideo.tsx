import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassPlayerVideoBase } from "./CourseClassPlayerVideo.base";
import { getStyles } from "./CourseClassPlayerVideo.styles";
import {
	CourseClassPlayerVideoProps,
	CourseClassPlayerVideoStyleProps,
	CourseClassPlayerVideoStyles,
} from "./CourseClassPlayerVideo.types";

export const CourseClassPlayerVideo = styled<
	CourseClassPlayerVideoProps,
	CourseClassPlayerVideoStyleProps,
	CourseClassPlayerVideoStyles
>(CourseClassPlayerVideoBase, getStyles, undefined, undefined, true);
