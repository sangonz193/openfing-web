import { IListProps, List, Panel } from "@fluentui/react";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";
import { useMediaQuery } from "react-responsive";

import { useObserveProperties } from "../../hooks/useObserveProperties";
import { useCourseClassPlayerStore } from "../../modules/CourseClassPlayer";
import { Breakpoint } from "../../style";
import { CourseClassPlayerButton } from "../CourseClassPlayerButton";
import { CourseClassPlayerChapterItem } from "../CourseClassPlayerChapterItem";
import {
	CourseClassPlayerShowChaptersButtonProps,
	CourseClassPlayerShowChaptersButtonStyleProps,
	CourseClassPlayerShowChaptersButtonStyles,
} from "./CourseClassPlayerShowChaptersButton.types";

const getClassNames = classNamesFunction<
	CourseClassPlayerShowChaptersButtonStyleProps,
	CourseClassPlayerShowChaptersButtonStyles
>();

export const CourseClassPlayerShowChaptersButtonBase = (props: CourseClassPlayerShowChaptersButtonProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className });

	const courseClassPlayerStore = useCourseClassPlayerStore();
	const { chapterTextTracks } = useObserveProperties(courseClassPlayerStore, [
		"chapterTextTracks",
		"activeChapterTextTracks",
	]);

	const [panelVisible, setPanelVisible] = React.useState(false);

	const handleShowPanelButtonPress = React.useCallback(() => setPanelVisible(true), []);

	const handlePanelDismiss = React.useCallback(() => setPanelVisible(false), []);

	const handleRenderCell = React.useCallback<Required<IListProps<VTTCue>>["onRenderCell"]>((item) => {
		if (!item) return null;

		return <CourseClassPlayerChapterItem vttCue={item} requestClosePanel={handlePanelDismiss} />;
	}, []);

	const handleGetKey = React.useCallback<Required<IListProps<VTTCue>>["getKey"]>((item) => item.id, []);

	const isMd = useMediaQuery({ minWidth: Breakpoint.md });

	return (
		<>
			<CourseClassPlayerButton iconName="List" buttonProps={{ onClick: handleShowPanelButtonPress }} />

			<Panel
				styles={classNames.subComponentStyles.panel}
				headerText="Índice de temas"
				isOpen={panelVisible}
				isLightDismiss
				layerProps={{ hostId: isMd ? "course-class-player-controls" : undefined }}
				onDismiss={handlePanelDismiss}
			>
				<List items={chapterTextTracks} onRenderCell={handleRenderCell} getKey={handleGetKey} />
			</Panel>
		</>
	);
};
