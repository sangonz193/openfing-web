import { styled } from "@fluentui/react/lib/Utilities";

import { CoursesBase } from "./Courses.base";
import { getStyles } from "./Courses.styles";
import { CoursesProps, CoursesStyleProps, CoursesStyles } from "./Courses.types";

export const Courses = styled<CoursesProps, CoursesStyleProps, CoursesStyles>(
	CoursesBase,
	getStyles,
	undefined,
	undefined,
	true
);
