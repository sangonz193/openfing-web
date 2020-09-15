import { styled } from "@fluentui/react/lib/Utilities";

import { CourseDetailBase } from "./CourseDetail.base";
import { getStyles } from "./CourseDetail.styles";
import { CourseDetailProps, CourseDetailStyleProps, CourseDetailStyles } from "./CourseDetail.types";

export const CourseDetail = styled<CourseDetailProps, CourseDetailStyleProps, CourseDetailStyles>(
	CourseDetailBase,
	getStyles,
	undefined,
	undefined,
	true
);
