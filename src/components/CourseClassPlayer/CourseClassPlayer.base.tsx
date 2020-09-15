import { LayerHost } from "@fluentui/react/lib/Layer";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import keyboardKey from "keyboard-key";
import throttle from "lodash/throttle";
import React from "react";
import ReactResizeDetector from "react-resize-detector";
import { useObserveProperties } from "src/hooks/useObserveProperties";

import { getCourseClassPlayerShortcuts } from "../../_utils/getCourseClassPlayerShortcuts";
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
	const observedAppStore = useObserveProperties(appStore, ["inputType", "isFocusVisible"]);
	const courseClassPlayerStore = useCourseClassPlayerStore();

	const handleKeyDown = React.useCallback<React.KeyboardEventHandler>((e) => {
		if (!e.defaultPrevented && appStore.isFocusVisible)
			courseClassPlayerStore.showControlsFor("controls-keyboard", 1000);

		getEventHandler(courseClassPlayerStore)(e);
	}, []);
	useRootEventListener("onKeyDown", handleKeyDown);

	const observedCourseClassPlayerStore = useObserveProperties(courseClassPlayerStore, [
		"isFullscreen",
		"showControls",
		"loaded",
		"waiting",
		"seeking",
	]);

	const classNames = getClassNames(styles, {
		theme,
		isFullscreen: observedCourseClassPlayerStore.isFullscreen,
		hideCursor: !observedCourseClassPlayerStore.showControls && observedCourseClassPlayerStore.isFullscreen,
	});

	const showControlsForId = "controls-player";
	const showControlsFor = () => courseClassPlayerStore.showControlsFor(showControlsForId, 3000);

	const togglePlayTimeoutRef = React.useRef<NodeJS.Timeout>();
	const handleWrapperClick = React.useCallback<React.MouseEventHandler>((e) => {
		if (e.defaultPrevented) return;
		e.preventDefault();

		if (typeof togglePlayTimeoutRef.current === "number") {
			// double click
			clearTimeout(togglePlayTimeoutRef.current);
			togglePlayTimeoutRef.current = undefined;

			courseClassPlayerStore.toggleFullscreen();
		} else {
			const newTimeout = setTimeout(() => {
				if (appStore.inputType === "TOUCH")
					if (courseClassPlayerStore.isBlockingShowControls(showControlsForId))
						courseClassPlayerStore.unblockShowControls(showControlsForId);
					else showControlsFor();
				else courseClassPlayerStore.togglePlay();

				if (newTimeout === togglePlayTimeoutRef.current) togglePlayTimeoutRef.current = undefined;
			}, 300);
			togglePlayTimeoutRef.current = newTimeout;
		}
	}, []);

	const [throttleShowControlsFor] = React.useState(() => throttle(() => showControlsFor(), 1000));
	const handleMouseMove = React.useCallback(() => {
		throttleShowControlsFor();
	}, []);

	const handleFocus = React.useCallback<React.FocusEventHandler>(() => {
		if (appStore.isFocusVisible) courseClassPlayerStore.showControlsFor("controls-keyboard", 2000);
	}, []);

	const [height, setHeight] = React.useState(0);
	const handleResize = React.useCallback<(width: number) => void>((width) => {
		setHeight((9 * width) / 16);
	}, []);

	React.useLayoutEffect(() => {
		if (courseClassPlayerStore.htmlVideoWrapperElement)
			handleResize(courseClassPlayerStore.htmlVideoWrapperElement.getBoundingClientRect().width);
	}, []);

	React.useEffect(() => {
		if (courseClassPlayerStore.loaded) courseClassPlayerStore.showControlsFor("player", 2000);
	}, [courseClassPlayerStore.loaded]);

	return (
		<div
			ref={courseClassPlayerStore.setVideoWrapperInstance}
			className={classNames.root}
			onKeyDown={handleKeyDown}
			onClick={handleWrapperClick}
			onMouseMove={observedAppStore.inputType !== "TOUCH" ? handleMouseMove : undefined}
			tabIndex={0}
			onFocus={handleFocus}
			style={observedCourseClassPlayerStore.isFullscreen ? undefined : { height }}
		>
			{!!courseClassVideo.qualities?.length && (
				<CourseClassPlayerVideo formats={courseClassVideo.qualities[0].formats} />
			)}

			{(!observedCourseClassPlayerStore.loaded ||
				observedCourseClassPlayerStore.waiting ||
				observedCourseClassPlayerStore.seeking) && (
				<Spinner size={SpinnerSize.large} styles={classNames.subComponentStyles.spinner} />
			)}

			{courseClassPlayerStore.loaded && (
				<div className={classNames.controlsWrapper}>
					<CourseClassPlayerControlsBottomControls styles={classNames.subComponentStyles.bottomControls} />

					<LayerHost id="course-class-player-controls" className={classNames.layerHost} />
				</div>
			)}

			<ReactResizeDetector handleWidth onResize={handleResize} skipOnMount />
		</div>
	);
};
