import { styled } from "@fluentui/react/lib/Utilities";

import { CourseItemBase } from "./CourseItem.base";
import { getStyles } from "./CourseItem.styles";
import { CourseItemProps, CourseItemStyleProps, CourseItemStyles } from "./CourseItem.types";

export const CourseItem = styled<CourseItemProps, CourseItemStyleProps, CourseItemStyles>(
	CourseItemBase,
	getStyles,
	undefined,
	undefined,
	true
);
