import { styled } from "@fluentui/react/lib/Utilities";

import { CourseBase } from "./Course.base";
import { getStyles } from "./Course.styles";
import { CourseProps, CourseStyleProps, CourseStyles } from "./Course.types";

export const Course = styled<CourseProps, CourseStyleProps, CourseStyles>(
	CourseBase,
	getStyles,
	undefined,
	undefined,
	true
);
