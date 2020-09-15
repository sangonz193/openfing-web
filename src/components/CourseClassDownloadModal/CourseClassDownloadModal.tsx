import { styled } from "@fluentui/react/lib/Utilities";

import { CourseClassDownloadModalBase } from "./CourseClassDownloadModal.base";
import { getStyles } from "./CourseClassDownloadModal.styles";
import {
	CourseClassDownloadModalProps,
	CourseClassDownloadModalStyleProps,
	CourseClassDownloadModalStyles,
} from "./CourseClassDownloadModal.types";

export const CourseClassDownloadModal = styled<
	CourseClassDownloadModalProps,
	CourseClassDownloadModalStyleProps,
	CourseClassDownloadModalStyles
>(CourseClassDownloadModalBase, getStyles, undefined, undefined, true);
