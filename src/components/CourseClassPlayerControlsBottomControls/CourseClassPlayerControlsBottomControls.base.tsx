import { useReactiveVar } from "@apollo/client";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";
import { useMediaQuery } from "react-responsive";

import { useComponent } from "../../hooks/useComponent";
import { useReactiveVars } from "../../hooks/useReactiveVars";
import { useAppStore } from "../../modules/App";
import { useCourseClassPlayerStore } from "../../modules/CourseClassPlayer";
import { Breakpoint } from "../../style";
import { CourseClassPlayerButton } from "../CourseClassPlayerButton";
import { CourseClassPlayerPlaybackRateButton } from "../CourseClassPlayerPlaybackRateButton";
import { CourseClassPlayerShowChaptersButton } from "../CourseClassPlayerShowChaptersButton";
import { CourseClassPlayerTrack } from "../CourseClassPlayerTrack";
import { CourseClassPlayerVolumeButton } from "../CourseClassPlayerVolumeButton";
import {
	CourseClassPlayerControlsBottomControlsProps,
	CourseClassPlayerControlsBottomControlsStyleProps,
	CourseClassPlayerControlsBottomControlsStyles,
} from "./CourseClassPlayerControlsBottomControls.types";

const getClassNames = classNamesFunction<
	CourseClassPlayerControlsBottomControlsStyleProps,
	CourseClassPlayerControlsBottomControlsStyles
>();

export const CourseClassPlayerControlsBottomControlsBase = (props: CourseClassPlayerControlsBottomControlsProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;

	const courseClassPlayerStore = useCourseClassPlayerStore();
	const { showControls, chapterTextTracks } = useReactiveVars(courseClassPlayerStore, [
		"showControls",
		"chapterTextTracks",
	]);

	const [wasVisible, setWasVisible] = React.useState(showControls);
	const classNames = getClassNames(styles, {
		theme,
		visible: wasVisible && showControls,
	});

	React.useEffect(() => {
		if (showControls) setWasVisible(true);
	}, [showControls]);

	const handlePlayClick = React.useCallback<React.MouseEventHandler<unknown>>((e) => {
		if (e?.defaultPrevented) return;

		e?.preventDefault();
		courseClassPlayerStore.togglePlay();
	}, []);

	const appStore = useAppStore();
	const inputType = useReactiveVar(appStore.inputType);

	const handleFullscreenClick = React.useCallback<React.MouseEventHandler<unknown>>((e) => {
		if (e?.defaultPrevented) return;

		e?.preventDefault();
		courseClassPlayerStore.toggleFullscreen();
	}, []);

	const handleClick = React.useCallback((e: React.MouseEvent) => {
		if (e.defaultPrevented) return;

		e.preventDefault();
		courseClassPlayerStore.showControlsFor("bottom-controls", 1500);
	}, []);

	const blockControlsId = "bottom-controls-hover";
	const handleMouseEnter = React.useCallback(() => courseClassPlayerStore.blockShowControls(blockControlsId), []);
	const handleMouseLeave = React.useCallback(() => courseClassPlayerStore.unblockShowControls(blockControlsId), []);

	const handleBackClick = React.useCallback(
		() => courseClassPlayerStore.setCurrentTime((courseClassPlayerStore.currentTime() || 0) - 10),
		[]
	);
	const handleForwardClick = React.useCallback(
		() => courseClassPlayerStore.setCurrentTime((courseClassPlayerStore.currentTime() || 0) + 10),
		[]
	);

	const isSM = useMediaQuery({ minWidth: Breakpoint.sm });

	const PauseButton = useComponent(() => {
		const { paused } = useReactiveVars(courseClassPlayerStore, ["paused"]);

		return (
			<CourseClassPlayerButton iconName={paused ? "Play" : "Pause"} buttonProps={{ onClick: handlePlayClick }} />
		);
	}, {});

	const PinCourseClassListButton = useComponent(() => {
		const { pinCourseClassList } = useReactiveVars(courseClassPlayerStore, ["pinCourseClassList"]);

		return (
			<CourseClassPlayerButton
				iconName={pinCourseClassList ? "Landscape" : "Square"}
				buttonProps={{
					title: pinCourseClassList ? "Ocultar barra lateral" : "Mostrar barra lateral",
					onClick: () => courseClassPlayerStore.pinCourseClassList(!pinCourseClassList),
				}}
			/>
		);
	}, {});

	const FullScreenButton = useComponent(() => {
		const { isFullscreen } = useReactiveVars(courseClassPlayerStore, ["isFullscreen"]);

		return (
			<CourseClassPlayerButton
				iconName={isFullscreen ? "ContractTwoArrows" : "Resize"}
				buttonProps={{ onClick: handleFullscreenClick }}
			/>
		);
	}, {});

	return (
		<div
			className={classNames.root}
			onClick={handleClick}
			onMouseEnter={inputType === "POINTER" ? handleMouseEnter : undefined}
			onMouseLeave={inputType === "POINTER" ? handleMouseLeave : undefined}
			onMouseOut={inputType === "POINTER" ? handleMouseLeave : undefined}
		>
			<CourseClassPlayerTrack />

			<div className={classNames.buttonsContainer}>
				<PauseButton />

				<CourseClassPlayerVolumeButton />

				<CourseClassPlayerButton
					styles={classNames.subComponentStyles.returnButton}
					iconName="ReturnUpBack"
					text="10"
					buttonProps={{ onClick: handleBackClick }}
				/>

				<CourseClassPlayerButton
					styles={classNames.subComponentStyles.returnButton}
					iconName="ReturnUpForward"
					text="10"
					buttonProps={{ onClick: handleForwardClick }}
				/>

				<div style={{ flex: 1 }} />

				{chapterTextTracks.length > 0 && <CourseClassPlayerShowChaptersButton />}

				<CourseClassPlayerPlaybackRateButton />

				{isSM && <PinCourseClassListButton />}

				<FullScreenButton />
			</div>
		</div>
	);
};
