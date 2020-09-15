import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

import { CourseClassPlayerVideoCourseClassVideoFormatFragment } from "./CourseClassPlayerVideo.graphql.generated";

export type CourseClassPlayerVideoProps = {
	formats: CourseClassPlayerVideoCourseClassVideoFormatFragment[];

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseClassPlayerVideoStyleProps, CourseClassPlayerVideoStyles>;
};

export type CourseClassPlayerVideoStyleProps = {
	isFullscreen: boolean;

	theme: ITheme;
	className?: string;
};

export type CourseClassPlayerVideoStyles = {
	root: IStyle;
};
