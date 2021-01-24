import type { ISpinnerProps } from "@fluentui/react/lib/Spinner";
import type { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import type { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

import type { CourseClassPlayerControlsBottomControlsProps } from "../CourseClassPlayerControlsBottomControls";
import type { CourseClassPlayerCourseClassVideoFragment } from "./CourseClassPlayer.graphql.generated";

export type CourseClassPlayerProps = {
	courseClassVideo: CourseClassPlayerCourseClassVideoFragment;

	theme?: ITheme;
	className?: string;
	styles?: IStyleFunctionOrObject<CourseClassPlayerStyleProps, CourseClassPlayerStyles>;
};

export type CourseClassPlayerStyleProps = {
	isFullscreen: boolean;
	hideCursor: boolean;

	theme: ITheme;
	className?: string;
};

export type CourseClassPlayerStyles = {
	root: IStyle;
	controlsWrapper: IStyle;
	leftTapArea: IStyle;
	rightTapArea: IStyle;
	layerHost: IStyle;

	subComponentStyles: {
		spinner: Required<ISpinnerProps>["styles"];
		bottomControls: Required<CourseClassPlayerControlsBottomControlsProps>["styles"];
	};
};
