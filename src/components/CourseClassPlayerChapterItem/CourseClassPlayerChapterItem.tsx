import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassPlayerChapterItemBase } from "./CourseClassPlayerChapterItem.base";
import { getStyles } from "./CourseClassPlayerChapterItem.styles";
import {
	CourseClassPlayerChapterItemProps,
	CourseClassPlayerChapterItemStyleProps,
	CourseClassPlayerChapterItemStyles,
} from "./CourseClassPlayerChapterItem.types";

export const CourseClassPlayerChapterItem = styled<
	CourseClassPlayerChapterItemProps,
	CourseClassPlayerChapterItemStyleProps,
	CourseClassPlayerChapterItemStyles
>(CourseClassPlayerChapterItemBase, getStyles, undefined, undefined, true);
