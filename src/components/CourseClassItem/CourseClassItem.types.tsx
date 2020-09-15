import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { ITextProps } from "@fluentui/react/lib/Text";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

import type { CourseClassItemCourseClassFragment } from "./CourseClassItem.graphql.generated";

export type CourseClassItemProps = {
	courseClass: CourseClassItemCourseClassFragment;

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseClassItemStyleProps, CourseClassItemStyles>;
};

export type CourseClassItemStyleProps = {
	isActive: boolean;

	theme: ITheme;
	className?: string;
};

export type CourseClassItemStyles = {
	root: IStyle;
	content: IStyle;

	subComponentStyles: {
		courseClassNumber: Required<ITextProps>["styles"];
		courseClassName: Required<ITextProps>["styles"];
	};
};
