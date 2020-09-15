import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";
import type { CourseDetailProps } from "src/components/CourseDetail";
import type { CourseMasterProps } from "src/components/CourseMaster";
import type { LinkProps } from "src/components/Link";

export type CourseProps = {
	courseClassListCode: string;
	courseClassNo: string | undefined;
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseStyleProps, CourseStyles>;
};

export type CourseStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CourseStyles = {
	root: IStyle;

	subComponentStyles: {
		headerLink: Required<LinkProps>["styles"];
		courseMaster: Required<CourseMasterProps>["styles"];
		courseDetails: Required<CourseDetailProps>["styles"];
	};
};
