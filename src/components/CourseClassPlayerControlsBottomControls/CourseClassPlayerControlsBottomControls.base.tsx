import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import { Observer } from "mobx-react-lite";
import React from "react";
import { useObserveProperties } from "src/hooks/useObserveProperties";

import { useAppStore } from "../../modules/App";
import { useCourseClassPlayerStore } from "../../modules/CourseClassPlayer";
import { CourseClassPlayerButton } from "../CourseClassPlayerButton";
import { CourseClassPlayerPlaybackRateButton } from "../CourseClassPlayerPlaybackRateButton";
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
	const observedCourseClassPlayerStore = useObserveProperties(courseClassPlayerStore, ["showControls"]);

	const [wasVisible, setWasVisible] = React.useState(observedCourseClassPlayerStore.showControls);
	const classNames = getClassNames(styles, {
		theme,
		visible: wasVisible && observedCourseClassPlayerStore.showControls,
	});

	React.useEffect(() => {
		if (observedCourseClassPlayerStore.showControls) setWasVisible(true);
	}, [observedCourseClassPlayerStore.showControls]);

	const handlePlayClick = React.useCallback<React.MouseEventHandler<unknown>>((e) => {
		if (e?.defaultPrevented) return;

		e?.preventDefault();
		courseClassPlayerStore.togglePlay();
	}, []);

	const appStore = useAppStore();
	const { inputType } = appStore;
	useObserveProperties(appStore, ["inputType"]);

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
		() => courseClassPlayerStore.setCurrentTime((courseClassPlayerStore.currentTime || 0) - 10),
		[]
	);
	const handleForwardClick = React.useCallback(
		() => courseClassPlayerStore.setCurrentTime((courseClassPlayerStore.currentTime || 0) + 10),
		[]
	);

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
				<Observer>
					{() => (
						<CourseClassPlayerButton
							iconName={courseClassPlayerStore.paused ? "Play" : "Pause"}
							buttonProps={{ onClick: handlePlayClick }}
						/>
					)}
				</Observer>

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

				<CourseClassPlayerPlaybackRateButton />

				<Observer>
					{() => (
						<CourseClassPlayerButton
							iconName={courseClassPlayerStore.isFullscreen ? "ContractTwoArrows" : "Resize"}
							buttonProps={{ onClick: handleFullscreenClick }}
						/>
					)}
				</Observer>
			</div>
		</div>
	);
};
