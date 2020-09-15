import { DirectionalHint, HoverCard, HoverCardType, IPlainCardProps } from "@fluentui/react/lib/HoverCard";
import { Slider } from "@fluentui/react/lib/Slider";
import { Stack } from "@fluentui/react/lib/Stack";
import { IProcessedStyleSet } from "@fluentui/react/lib/Styling";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import { Observer } from "mobx-react-lite";
import React from "react";

import { useComponentWithProps } from "../../hooks/useComponent";
import { useObserveProperties } from "../../hooks/useObserveProperties";
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
	const { volume } = useObserveProperties(courseClassPlayerStore, ["volume"]);

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
	const observedAppStore = useObserveProperties(appStore, ["inputType"]);

	const courseClassPlayerStore = useCourseClassPlayerStore();
	const { isFullscreen } = useObserveProperties(courseClassPlayerStore, ["isFullscreen"]);

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
	const handleClick = React.useCallback(
		(e) => {
			const { volume } = courseClassPlayerStore;
			if (observedAppStore.inputType !== "POINTER") return;

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
		},
		[observedAppStore.inputType]
	);

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
				<Observer>
					{() => (
						<CourseClassPlayerButton
							iconName={
								courseClassPlayerStore.volume === 0
									? "VolumeMute"
									: (courseClassPlayerStore.volume ?? 1) < 0.4
									? "VolumeLow"
									: (courseClassPlayerStore.volume ?? 1) < 0.75
									? "VolumeMedium"
									: "VolumeHigh"
							}
							buttonProps={{ onClick: handleClick }}
						/>
					)}
				</Observer>
			</HoverCard>
		</>
	);
};
