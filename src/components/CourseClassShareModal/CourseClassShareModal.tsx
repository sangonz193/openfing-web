import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassShareModalBase } from "./CourseClassShareModal.base";
import { getStyles } from "./CourseClassShareModal.styles";
import {
	CourseClassShareModalProps,
	CourseClassShareModalStyleProps,
	CourseClassShareModalStyles,
} from "./CourseClassShareModal.types";

export const CourseClassShareModal = styled<
	CourseClassShareModalProps,
	CourseClassShareModalStyleProps,
	CourseClassShareModalStyles
>(CourseClassShareModalBase, getStyles, undefined, undefined, true);
