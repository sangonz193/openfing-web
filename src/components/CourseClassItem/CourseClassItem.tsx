import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassItemBase } from "./CourseClassItem.base";
import { getStyles } from "./CourseClassItem.styles";
import { CourseClassItemProps, CourseClassItemStyleProps, CourseClassItemStyles } from "./CourseClassItem.types";

export const CourseClassItem = styled<CourseClassItemProps, CourseClassItemStyleProps, CourseClassItemStyles>(
	CourseClassItemBase,
	getStyles,
	undefined,
	undefined,
	true
);
