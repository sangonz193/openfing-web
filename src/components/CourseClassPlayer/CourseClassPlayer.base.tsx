import { useReactiveVar } from "@apollo/client";
import { LayerHost } from "@fluentui/react/lib/Layer";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import keyboardKey from "keyboard-key";
import throttle from "lodash/throttle";
import React from "react";
import ReactResizeDetector from "react-resize-detector";

import { getCourseClassPlayerShortcuts } from "../../_utils/getCourseClassPlayerShortcuts";
import { useDoubleClick } from "../../hooks/useDoubleClick";
import { useReactiveVars } from "../../hooks/useReactiveVars";
import { useAppStore } from "../../modules/App";
import { CourseClassPlayerStore, useCourseClassPlayerStore } from "../../modules/CourseClassPlayer";
import { useRootEventListener } from "../../modules/RootEventListeners";
import { CourseClassPlayerControlsBottomControls } from "../CourseClassPlayerControlsBottomControls";
import { CourseClassPlayerVideo } from "../CourseClassPlayerVideo";
import {
	CourseClassPlayerProps,
	CourseClassPlayerStyleProps,
	CourseClassPlayerStyles,
} from "./CourseClassPlayer.types";

const getClassNames = classNamesFunction<CourseClassPlayerStyleProps, CourseClassPlayerStyles>();

const getEventHandler = (
	courseClassPlayerStore: CourseClassPlayerStore
): ((e: KeyboardEvent | React.KeyboardEvent) => void) => (e) => {
	if (e.defaultPrevented || !courseClassPlayerStore.loaded || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)
		return;

	const handler = getCourseClassPlayerShortcuts(courseClassPlayerStore)[
		keyboardKey.getKey(e) as keyof typeof keyboardKey
	];

	if (handler) {
		handler();
		e.preventDefault();
	}
};

export const CourseClassPlayerBase = (props: CourseClassPlayerProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;

	const { courseClassVideo } = props;
	const appStore = useAppStore();
	const inputType = useReactiveVar(appStore.inputType);
	const courseClassPlayerStore = useCourseClassPlayerStore();

	const handleKeyDown = React.useCallback<React.KeyboardEventHandler>((e) => {
		if (!e.defaultPrevented && appStore.isFocusVisible)
			courseClassPlayerStore.showControlsFor("controls-keyboard", 1000);

		getEventHandler(courseClassPlayerStore)(e);
	}, []);
	useRootEventListener("onKeyDown", handleKeyDown);

	const { isFullscreen, loaded, seeking, showControls, waiting } = useReactiveVars(courseClassPlayerStore, [
		"isFullscreen",
		"showControls",
		"loaded",
		"waiting",
		"seeking",
	]);

	const classNames = getClassNames(styles, {
		theme,
		isFullscreen: isFullscreen,
		hideCursor: !showControls && isFullscreen,
	});

	const showControlsForId = "controls-player";
	const showControlsFor = () => courseClassPlayerStore.showControlsFor(showControlsForId, 3000);

	const handleWrapperClick = useDoubleClick({
		onDoubleClick: React.useCallback(() => {
			courseClassPlayerStore.toggleFullscreen();
		}, []),
		onClick: React.useCallback(() => courseClassPlayerStore.togglePlay(), []),
	});
	const handleWrapperTap = React.useCallback<React.MouseEventHandler>((e) => {
		if (e.defaultPrevented) return;

		if (courseClassPlayerStore.isBlockingShowControls(showControlsForId))
			courseClassPlayerStore.unblockShowControls(showControlsForId);
		else showControlsFor();
	}, []);

	const [throttleShowControlsFor] = React.useState(() => throttle(() => showControlsFor(), 1000));
	const handleMouseMove = React.useCallback(() => {
		throttleShowControlsFor();
	}, []);

	const handleFocus = React.useCallback<React.FocusEventHandler>(() => {
		if (appStore.isFocusVisible()) courseClassPlayerStore.showControlsFor("controls-keyboard", 2000);
	}, []);

	const [height, setHeight] = React.useState(0);
	const handleResize = React.useCallback<(width: number) => void>((width) => {
		setHeight((9 * width) / 16);
	}, []);

	React.useLayoutEffect(() => {
		const htmlVideoWrapperElement = courseClassPlayerStore.htmlVideoWrapperElement();
		if (htmlVideoWrapperElement) handleResize(htmlVideoWrapperElement.getBoundingClientRect().width);
	}, []);

	React.useEffect(() => {
		if (loaded) courseClassPlayerStore.showControlsFor("player", 2000);
	}, [loaded]);

	const handleLeftClick = useDoubleClick({
		onDoubleClick: React.useCallback(() => {
			const isBlockingControls = courseClassPlayerStore.isBlockingShowControls(showControlsForId);

			courseClassPlayerStore.setCurrentTime(courseClassPlayerStore.currentTime() - 10);

			if (isBlockingControls) courseClassPlayerStore.showControlsFor(showControlsForId, 3000);
		}, []),
		onClick: React.useCallback(() => {
			const isBlockingControls = courseClassPlayerStore.isBlockingShowControls(showControlsForId);

			if (isBlockingControls) courseClassPlayerStore.unblockShowControls(showControlsForId);
			else courseClassPlayerStore.showControlsFor(showControlsForId, 3000);
		}, []),
	});

	const handleRightClick = useDoubleClick({
		onDoubleClick: React.useCallback(() => {
			const isBlockingControls = courseClassPlayerStore.isBlockingShowControls(showControlsForId);

			courseClassPlayerStore.setCurrentTime(courseClassPlayerStore.currentTime() + 10);

			if (isBlockingControls) courseClassPlayerStore.showControlsFor(showControlsForId, 3000);
		}, []),
		onClick: React.useCallback(() => {
			const isBlockingControls = courseClassPlayerStore.isBlockingShowControls(showControlsForId);

			if (isBlockingControls) courseClassPlayerStore.unblockShowControls(showControlsForId);
			else courseClassPlayerStore.showControlsFor(showControlsForId, 3000);
		}, []),
	});

	return (
		<div
			ref={courseClassPlayerStore.setVideoWrapperInstance}
			className={classNames.root}
			onKeyDown={handleKeyDown}
			onClick={inputType === "TOUCH" ? handleWrapperTap : handleWrapperClick}
			onMouseMove={inputType !== "TOUCH" ? handleMouseMove : undefined}
			tabIndex={0}
			onFocus={handleFocus}
			style={isFullscreen ? undefined : { height }}
		>
			{!!courseClassVideo.qualities?.length && (
				<CourseClassPlayerVideo formats={courseClassVideo.qualities[0].formats} />
			)}

			{(!loaded || waiting || seeking) && (
				<Spinner size={SpinnerSize.large} styles={classNames.subComponentStyles.spinner} />
			)}

			{loaded && (
				<div className={classNames.controlsWrapper}>
					{inputType === "TOUCH" && (
						<>
							<button className={classNames.leftTapArea} onClick={handleLeftClick} />
							<button className={classNames.rightTapArea} onClick={handleRightClick} />
						</>
					)}

					<CourseClassPlayerControlsBottomControls styles={classNames.subComponentStyles.bottomControls} />

					<LayerHost id="course-class-player-controls" className={classNames.layerHost} />
				</div>
			)}

			<ReactResizeDetector handleWidth onResize={handleResize} skipOnMount />
		</div>
	);
};
