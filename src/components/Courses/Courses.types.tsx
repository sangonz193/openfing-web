import type { IIconProps } from "@fluentui/react/lib/Icon";
import type { ISearchBoxProps } from "@fluentui/react/lib/SearchBox";
import type { ISpinnerProps } from "@fluentui/react/lib/Spinner";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CoursesProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CoursesStyleProps, CoursesStyles>;
};

export type CoursesStyleProps = {
	theme: ITheme;
	className?: string;
};

export type CoursesStyles = {
	root: IStyle;
	searchField: IStyle;
	content: IStyle;

	subComponentStyles: {
		spinner: Required<ISpinnerProps>["styles"];
		searchBox: Required<ISearchBoxProps>["styles"];
		searchBoxClearButtonIcon: Required<IIconProps>["styles"];
	};
};
