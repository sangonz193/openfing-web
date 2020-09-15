import type { IImageProps } from "@fluentui/react/lib/Image";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { ITextProps } from "@fluentui/react/lib/Text";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

import { CourseItemCourseFragment } from "./CourseItem.graphql.generated";

export type CourseItemProps = {
	course: CourseItemCourseFragment;

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseItemStyleProps, CourseItemStyles>;
};

export type CourseItemStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CourseItemStyles = {
	root: IStyle;
	imageContainer: IStyle;
	infoContainer: IStyle;

	subComponentStyles: {
		image: Required<IImageProps>["styles"];
		year: Required<ITextProps>["styles"];
	};
};
