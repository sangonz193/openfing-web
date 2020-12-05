import { DefaultButton, IButtonProps } from "@fluentui/react/lib/Button";
import { Callout, DirectionalHint } from "@fluentui/react/lib/Callout";
import { Slider } from "@fluentui/react/lib/Slider";
import { IProcessedStyleSet } from "@fluentui/react/lib/Styling";
import { Text } from "@fluentui/react/lib/Text";
import { classNamesFunction, Point } from "@fluentui/react/lib/Utilities";
import throttle from "lodash/throttle";
import React from "react";
import { useObserveProperties } from "src/hooks/useObserveProperties";

import { secondsToString } from "../../_utils/secondsToString";
import { useCourseClassPlayerStore } from "../../modules/CourseClassPlayer";
import {
	CourseClassPlayerTrackProps,
	CourseClassPlayerTrackStyleProps,
	CourseClassPlayerTrackStyles,
} from "./CourseClassPlayerTrack.types";

const getClassNames = classNamesFunction<CourseClassPlayerTrackStyleProps, CourseClassPlayerTrackStyles>();

const CurrentTime = React.memo(() => {
	const { currentTime } = useObserveProperties(useCourseClassPlayerStore(), ["currentTime"]);

	return <>{secondsToString(currentTime || 0)}</>;
});

const Duration = React.memo(() => {
	const { duration } = useObserveProperties(useCourseClassPlayerStore(), ["duration"]);

	return <>{secondsToString(duration || 0)}</>;
});

const RemainingTime = React.memo(() => {
	const { currentTime, duration } = useObserveProperties(useCourseClassPlayerStore(), ["currentTime", "duration"]);

	return <>{secondsToString((duration || 0) - (currentTime || 0))}</>;
});

const TimeSlider = React.memo((props: { classNames: IProcessedStyleSet<CourseClassPlayerTrackStyles> }) => {
	const { classNames } = props;
	const courseClassPlayerStore = useCourseClassPlayerStore();
	const { duration, currentTime, isFullscreen } = useObserveProperties(courseClassPlayerStore, [
		"duration",
		"currentTime",
		"isFullscreen",
	]);

	const [blockTooltipIds, setBlockTooltipIds] = React.useState<string[]>([]);
	const backgroundTrackRef = React.useRef<HTMLDivElement>(null);

	const blockTooltip = (id: string) => {
		setBlockTooltipIds((e) => [...e.filter((i) => i !== id), id]);
	};
	const unblockTooltip = (id: string) => {
		setBlockTooltipIds((e) => [...e.filter((i) => i !== id)]);
	};

	const [sliderValueSource, setSliderValueSource] = React.useState<
		{ type: "store" } | { type: "local"; value: number }
	>({
		type: "store",
	});
	const [tooltipPositionData, setTooltipPositionData] = React.useState<
		{ point: Required<Pick<Point, "left" | "top">>; bounds: { left: number; width: number } } | false
	>();

	const handleChange = React.useCallback((value: number) => {
		blockTooltip("drag");
		if (!backgroundTrackRef.current) return;

		const wrapperBounds = backgroundTrackRef.current.getBoundingClientRect();
		setTooltipPositionData({
			point: {
				top: wrapperBounds.top,
				left: wrapperBounds.left + (value * wrapperBounds.width) / courseClassPlayerStore.duration,
			},
			bounds: {
				left: wrapperBounds.left,
				width: wrapperBounds.width,
			},
		});
		setSliderValueSource({ type: "local", value });
	}, []);
	const [throttleHandleChange] = React.useState(() => throttle(handleChange, 200));

	const handleChanged = React.useCallback((_: unknown, value: number) => {
		setTimeout(() => unblockTooltip("drag"), 300);
		courseClassPlayerStore.setCurrentTime(value);
		throttleHandleChange.cancel();
		setSliderValueSource({ type: "store" });
	}, []);

	const handleTooltipPositionFromEvent = React.useCallback((e: { clientX: number }) => {
		if (!backgroundTrackRef.current) return;

		const wrapperBounds = backgroundTrackRef.current.getBoundingClientRect();
		setTooltipPositionData({
			point: {
				top: wrapperBounds.top,
				left: e.clientX,
			},
			bounds: {
				left: wrapperBounds.left,
				width: wrapperBounds.width,
			},
		});
	}, []);
	const [throttleHandleTooltipPositionFromEvent] = React.useState(() => throttle(handleTooltipPositionFromEvent, 50));

	const [showTooltip, setShowTooltip] = React.useState(false);
	const hideTooltipTimeoutRef = React.useRef<NodeJS.Timeout>();
	React.useEffect(() => {
		const shouldShowTooltip = !!blockTooltipIds.length;

		if (shouldShowTooltip) {
			if (hideTooltipTimeoutRef.current) {
				clearTimeout(hideTooltipTimeoutRef.current);
				hideTooltipTimeoutRef.current = undefined;
			}

			if (!showTooltip) setShowTooltip(true);
		} else if (showTooltip !== shouldShowTooltip)
			hideTooltipTimeoutRef.current = setTimeout(() => setShowTooltip(shouldShowTooltip), 300);
	}, [blockTooltipIds]);

	React.useEffect(() => {
		if (showTooltip) courseClassPlayerStore.blockShowControls("track");
		else courseClassPlayerStore.unblockShowControls("track");
	}, [showTooltip, tooltipPositionData]);

	const tooltipTimePosition =
		showTooltip &&
		tooltipPositionData &&
		Math.max(
			0,
			Math.min(
				((tooltipPositionData.point.left - tooltipPositionData.bounds.left) * duration) /
					(tooltipPositionData.bounds.width || 1),
				duration
			)
		);

	const handleSliderButtonMouseEnter = React.useCallback<React.MouseEventHandler>((e) => {
		blockTooltip("hover");
		throttleHandleTooltipPositionFromEvent.cancel();
		handleTooltipPositionFromEvent({ clientX: e.clientX });
	}, []);

	const handleSliderButtonMouseMove = React.useCallback<React.MouseEventHandler>((e) => {
		throttleHandleTooltipPositionFromEvent({ clientX: e.clientX });
	}, []);

	const handleSliderButtonMouseLeave = React.useCallback<React.MouseEventHandler>(() => {
		throttleHandleTooltipPositionFromEvent.cancel();
		setTimeout(() => unblockTooltip("hover"));
	}, []);

	const handleSliderButtonFocus = React.useCallback(() => {
		courseClassPlayerStore.htmlVideoWrapperElement?.focus();
	}, []);

	return (
		<div className={classNames.sliderWrapper}>
			{tooltipPositionData && typeof tooltipTimePosition === "number" && (
				<Callout
					target={tooltipPositionData.point}
					directionalHint={DirectionalHint.topCenter}
					styles={classNames.subComponentStyles.timeSliderCallout}
					isBeakVisible={false}
					gapSpace={20}
					layerProps={{ hostId: isFullscreen ? "course-class-player-controls" : undefined }}
				>
					<Text styles={classNames.subComponentStyles.timeSliderCalloutText}>
						{secondsToString(tooltipTimePosition)}
					</Text>
				</Callout>
			)}

			<div ref={backgroundTrackRef} className={classNames.sliderBackgroundTrack}>
				<div
					className={classNames.sliderBufferedTrack}
					style={{
						width: `${
							(tooltipTimePosition && sliderValueSource.type === "store"
								? (tooltipTimePosition * 100) / (courseClassPlayerStore.duration || 1)
								: courseClassPlayerStore.loadedPercentage) || 0
						}%`,
					}}
				/>
			</div>

			<Slider
				styles={classNames.subComponentStyles.slider}
				showValue={false}
				min={0}
				max={duration || undefined}
				value={sliderValueSource.type === "local" ? sliderValueSource.value : currentTime}
				onChange={throttleHandleChange}
				onChanged={handleChanged}
				buttonProps={{
					onMouseEnter: handleSliderButtonMouseEnter,
					onMouseMove: handleSliderButtonMouseMove,
					onMouseLeave: handleSliderButtonMouseLeave,
					onFocus: handleSliderButtonFocus,
				}}
			/>
		</div>
	);
});

export const CourseClassPlayerTrackBase = (props: CourseClassPlayerTrackProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme });

	const [showTimeLeft, setShowTimeLeft] = React.useState(false);
	const handleTimeLeftClick = React.useCallback<Required<IButtonProps>["onClick"]>((e) => {
		e.preventDefault();
		setShowTimeLeft((value) => !value);
	}, []);

	return (
		<div className={classNames.root}>
			<div className={classNames.startTimeWrapper}>
				<Text className={classNames.startTime}>
					<CurrentTime />
				</Text>
			</div>

			<TimeSlider classNames={classNames} />

			<DefaultButton className={classNames.endTimeWrapper} onClick={handleTimeLeftClick}>
				<Text className={classNames.startTime}>{showTimeLeft ? <RemainingTime /> : <Duration />}</Text>
			</DefaultButton>
		</div>
	);
};
