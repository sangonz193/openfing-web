import { DirectionalHint, HoverCard, HoverCardType, IPlainCardProps } from "@fluentui/react/lib/HoverCard";
import { Slider } from "@fluentui/react/lib/Slider";
import { Stack } from "@fluentui/react/lib/Stack";
import { IProcessedStyleSet } from "@fluentui/react/lib/Styling";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import { useComponent, useComponentWithProps } from "../../hooks/useComponent";
import { useReactiveVars } from "../../hooks/useReactiveVars";
import { useAppStore } from "../../modules/App";
import { useCourseClassPlayerStore } from "../../modules/CourseClassPlayer";
import { CourseClassPlayerButton } from "../CourseClassPlayerButton";
import {
	CourseClassPlayerVolumeButtonProps,
	CourseClassPlayerVolumeButtonStyleProps,
	CourseClassPlayerVolumeButtonStyles,
} from "./CourseClassPlayerVolumeButton.types";

const getClassNames = classNamesFunction<
	CourseClassPlayerVolumeButtonStyleProps,
	CourseClassPlayerVolumeButtonStyles
>();

const RenderPlainCard = React.memo((props: { classNames: IProcessedStyleSet<CourseClassPlayerVolumeButtonStyles> }) => {
	const { classNames } = props;
	const courseClassPlayerStore = useCourseClassPlayerStore();
	const { volume } = useReactiveVars(courseClassPlayerStore, ["volume"]);

	const handleChange = React.useCallback((v: number) => {
		courseClassPlayerStore.setVolume(v / 100);
	}, []);

	return (
		<Stack className={classNames.sliderWrapper} horizontal>
			<Slider
				styles={classNames.subComponentStyles.slider}
				vertical
				min={0}
				max={100}
				value={Math.floor(volume * 100)}
				onChange={handleChange}
			/>
		</Stack>
	);
});

export const CourseClassPlayerVolumeButtonBase = (props: CourseClassPlayerVolumeButtonProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme });

	const appStore = useAppStore();

	const courseClassPlayerStore = useCourseClassPlayerStore();
	const { isFullscreen } = useReactiveVars(courseClassPlayerStore, ["isFullscreen"]);

	const RenderPlainCardWithProps = useComponentWithProps(RenderPlainCard, { classNames });
	const handleRenderPlainCard = React.useCallback(() => <RenderPlainCardWithProps />, []);
	const plainCardProps: IPlainCardProps = React.useMemo(
		() => ({
			onRenderPlainCard: handleRenderPlainCard,
			directionalHint: DirectionalHint.topCenter,
			calloutProps: {
				layerProps: {
					hostId: isFullscreen ? "course-class-player-controls" : undefined,
				},
			},
			firstFocus: false,
		}),
		[isFullscreen, handleRenderPlainCard]
	);

	const [previousVolume, setPreviousVolume] = React.useState(0);
	const handleClick = React.useCallback((e) => {
		const volume = courseClassPlayerStore.volume();
		if (appStore.inputType() !== "POINTER") return;

		e?.preventDefault();
		if (volume === 0) {
			if (previousVolume !== 0) {
				courseClassPlayerStore.setVolume(previousVolume);
				setPreviousVolume(0);
			}
		} else {
			courseClassPlayerStore.setVolume(0);
			setPreviousVolume(volume);
		}
	}, []);

	const CourseClassPlayerButtonWithIcon = useComponent(() => {
		const { volume } = useReactiveVars(courseClassPlayerStore, ["volume"]);

		return (
			<CourseClassPlayerButton
				iconName={
					volume === 0
						? "VolumeMute"
						: (volume ?? 1) < 0.4
						? "VolumeLow"
						: (volume ?? 1) < 0.75
						? "VolumeMedium"
						: "VolumeHigh"
				}
				buttonProps={{ onClick: handleClick }}
			/>
		);
	}, {});

	return (
		<>
			<HoverCard
				styles={classNames.subComponentStyles.hoverCard}
				plainCardProps={plainCardProps}
				instantOpenOnClick={true}
				type={HoverCardType.plain}
				cardOpenDelay={100}
				onCardVisible={() => courseClassPlayerStore.blockShowControls("controls-volume")}
				onCardHide={() => courseClassPlayerStore.unblockShowControls("controls-volume")}
			>
				<CourseClassPlayerButtonWithIcon />
			</HoverCard>
		</>
	);
};
