import type { IDropdownProps } from "@fluentui/react/lib/Dropdown";
import type { ISeparatorProps } from "@fluentui/react/lib/Separator";
import type { ISpinnerProps } from "@fluentui/react/lib/Spinner";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export type CourseMasterProps = {
	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseMasterStyleProps, CourseMasterStyles>;
};

export type CourseMasterStyleProps = {
	showCourseClassListDropdown: boolean;

	theme: ITheme;
	className?: string;
};

export type CourseMasterStyles = {
	root: IStyle;
	dropdownsContainer: IStyle;

	subComponentStyles: {
		editionsSpinner: Required<ISpinnerProps>["styles"];
		itemSeparator: Required<ISeparatorProps>["styles"];
		editionDropdown: Required<IDropdownProps>["styles"];
	};
};
