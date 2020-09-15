import { styled } from "@fluentui/react/lib/Utilities";

import { CourseMasterBase } from "./CourseMaster.base";
import { getStyles } from "./CourseMaster.styles";
import { CourseMasterProps, CourseMasterStyleProps, CourseMasterStyles } from "./CourseMaster.types";

export const CourseMaster = styled<CourseMasterProps, CourseMasterStyleProps, CourseMasterStyles>(
	CourseMasterBase,
	getStyles,
	undefined,
	undefined,
	true
);
