import type { IImageProps } from "@fluentui/react/lib/Image";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { ITextProps } from "@fluentui/react/lib/Text";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

import type { UpdateItemCourseClassFragment } from "./UpdateItem.graphql.generated";

export type UpdateItemProps = {
	courseClass: UpdateItemCourseClassFragment;

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<UpdateItemStyleProps, UpdateItemStyles>;
};

export type UpdateItemStyleProps = {
	theme: ITheme;
	className?: string;
};

export type UpdateItemStyles = {
	root: IStyle;
	iconContainer: IStyle;
	infoContainer: IStyle;

	subComponentStyles: {
		image: Required<IImageProps>["styles"];
		courseName: Required<ITextProps>["styles"];
		publishedAt: Required<ITextProps>["styles"];
	};
};
