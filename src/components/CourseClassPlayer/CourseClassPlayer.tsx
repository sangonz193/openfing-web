import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassPlayerBase } from "./CourseClassPlayer.base";
import { getStyles } from "./CourseClassPlayer.styles";
import {
	CourseClassPlayerProps,
	CourseClassPlayerStyleProps,
	CourseClassPlayerStyles,
} from "./CourseClassPlayer.types";

export const CourseClassPlayer = styled<CourseClassPlayerProps, CourseClassPlayerStyleProps, CourseClassPlayerStyles>(
	CourseClassPlayerBase,
	getStyles,
	undefined,
	undefined,
	true
);
