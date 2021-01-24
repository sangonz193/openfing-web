import type { ICalloutProps } from "@fluentui/react/lib/Callout";
import {
	ContextualMenuItem,
	DirectionalHint,
	IContextualMenuItem,
	IContextualMenuItemProps,
	IContextualMenuListProps,
	IContextualMenuProps,
} from "@fluentui/react/lib/ContextualMenu";
import { FocusTrapZone } from "@fluentui/react/lib/FocusTrapZone";
import { Slider } from "@fluentui/react/lib/Slider";
import { Stack } from "@fluentui/react/lib/Stack";
import { IProcessedStyleSet, ITheme } from "@fluentui/react/lib/Styling";
import { Text } from "@fluentui/react/lib/Text";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import keyboardKey from "keyboard-key";
import debounce from "lodash/debounce";
import React from "react";
import { useComponentWithProps } from "src/hooks/useComponent";
import { useObserveProperties } from "src/hooks/useObserveProperties";

import { getCourseClassPlayerShortcuts } from "../../_utils/getCourseClassPlayerShortcuts";
import { secondsToString } from "../../_utils/secondsToString";
import { useAppStore } from "../../modules/App";
import { useCourseClassPlayerStore } from "../../modules/CourseClassPlayer";
import { CourseClassPlayerButton } from "../CourseClassPlayerButton";
import {
	CourseClassPlayerPlaybackRateButtonProps,
	CourseClassPlayerPlaybackRateButtonStyleProps,
	CourseClassPlayerPlaybackRateButtonStyles,
} from "./CourseClassPlayerPlaybackRateButton.types";

const getClassNames = classNamesFunction<
	CourseClassPlayerPlaybackRateButtonStyleProps,
	CourseClassPlayerPlaybackRateButtonStyles
>();

const playbackRates: number[] = [];
for (let i = 8; i > 0; i--) playbackRates.push(i * 0.25);

const PlaybackRateMenuItem: React.FC<{
	contextualMenuItemProps: IContextualMenuItemProps;
	theme: ITheme;
	classNames: IProcessedStyleSet<CourseClassPlayerPlaybackRateButtonStyles>;
}> = (props) => {
	const playbackRate = props.contextualMenuItemProps.item.data as number;
	const { classNames } = props;

	const {
		currentTime,
		duration,
		playbackRate: currentPlaybackRate,
	} = useObserveProperties(useCourseClassPlayerStore(), ["currentTime", "duration", "playbackRate"]);

	const text = React.useMemo(
		() =>
			`${playbackRate
				.toLocaleString(undefined, {
					minimumFractionDigits: 1,
				})
				.replace(",", ".")}x`,
		[playbackRate]
	);
	const secondaryText = `(${secondsToString((duration - currentTime) / (playbackRate as number))})`;
	const checked = playbackRate === currentPlaybackRate;

	const item: IContextualMenuItem = {
		key: playbackRate.toString(),
		text,
		secondaryText,
		checked,
		canCheck: true,
	};

	React.useMemo(() => {
		if (!props.contextualMenuItemProps.classNames.linkContent.includes(classNames.contextualMenuItem))
			props.contextualMenuItemProps.classNames.linkContent += " " + classNames.contextualMenuItem;
	}, [props.contextualMenuItemProps.classNames.linkContent]);

	return <ContextualMenuItem {...props.contextualMenuItemProps} item={item} onCheckmarkClick={() => {}} />;
};

const ContextMenuSlider: React.FC<{
	classNames: IProcessedStyleSet<CourseClassPlayerPlaybackRateButtonStyles>;
}> = React.memo((props) => {
	const { classNames } = props;
	const courseClassPlayerStore = useCourseClassPlayerStore();
	const { playbackRate } = useObserveProperties(courseClassPlayerStore, ["playbackRate"]);
	const [valueSource, setValueSource] = React.useState<{ type: "store" } | { type: "local"; value: number }>({
		type: "store",
	});
	const [debounceSetPlaybackRate] = React.useState(() =>
		debounce((v: number) => courseClassPlayerStore.setPlaybackRate(v), 50)
	);

	const handleSliderChange = React.useCallback((value: number) => {
		debounceSetPlaybackRate(value);
		setValueSource({ type: "local", value });
	}, []);

	const handleSliderChanged = React.useCallback((_: unknown, v: number) => {
		debounceSetPlaybackRate.cancel();
		courseClassPlayerStore.setPlaybackRate(v);
		setValueSource({ type: "store" });
	}, []);

	const valueToShow = valueSource.type === "local" ? valueSource.value : playbackRate;

	return (
		<Stack styles={classNames.subComponentStyles.contextMenuSliderWrapper}>
			<Stack horizontal>
				<Text styles={classNames.subComponentStyles.contextMenuSliderText}>
					{valueToShow.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace(",", ".")}x
				</Text>
			</Stack>

			<Slider
				styles={classNames.subComponentStyles.contextMenuSlider}
				min={0.25}
				max={2}
				step={0.05}
				value={valueToShow}
				showValue={false}
				onChange={handleSliderChange}
				onChanged={handleSliderChanged}
			/>
		</Stack>
	);
});

const RenderMenuList: React.FC<{
	classNames: IProcessedStyleSet<CourseClassPlayerPlaybackRateButtonStyles>;
	menuListProps: IContextualMenuListProps;
	defaultRenderer: (props: IContextualMenuListProps) => JSX.Element | null;
}> = (props) => {
	const { defaultRenderer, menuListProps, classNames } = props;

	return (
		<FocusTrapZone isClickableOutsideFocusTrap>
			<Stack styles={classNames.subComponentStyles.renderMenuListWrapper}>
				<Stack styles={classNames.subComponentStyles.renderMenuListDefaultRendererContainer}>
					{defaultRenderer && props && defaultRenderer(menuListProps)}
				</Stack>

				<Stack styles={classNames.subComponentStyles.renderMenuListSeparator} />

				<ContextMenuSlider classNames={classNames} />
			</Stack>
		</FocusTrapZone>
	);
};

const CommandBarButtonIcon: React.FC<{ classNames: IProcessedStyleSet<CourseClassPlayerPlaybackRateButtonStyles> }> = (
	props
) => {
	const { playbackRate } = useObserveProperties(useCourseClassPlayerStore(), ["playbackRate"]);

	return (
		<Text styles={props.classNames.subComponentStyles?.commandButtonText}>
			{playbackRate.toLocaleString(undefined, { minimumFractionDigits: 1 }).replace(",", ".")}x
		</Text>
	);
};

export const CourseClassPlayerPlaybackRateButtonBase = (props: CourseClassPlayerPlaybackRateButtonProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, {
		theme,
	});

	const appStore = useAppStore();
	const courseClassPlayerStore = useCourseClassPlayerStore();
	const observedCourseClassPlayerStore = useObserveProperties(courseClassPlayerStore, ["isFullscreen"]);

	const menuItems: IContextualMenuItem[] = React.useMemo(
		() =>
			playbackRates.map((r) => ({
				key: r.toString(),
				data: r,
				onClick: () => courseClassPlayerStore.setPlaybackRate(r),
			})),
		[]
	);

	const PlaybackRateMenuItemWithProps = useComponentWithProps<
		React.ComponentProps<typeof PlaybackRateMenuItem>,
		"classNames" | "theme"
	>(PlaybackRateMenuItem, { classNames, theme });
	const contextualMenuItemAs: IContextualMenuProps["contextualMenuItemAs"] = React.useCallback(
		(props) => <PlaybackRateMenuItemWithProps contextualMenuItemProps={props} />,
		[]
	);

	const handleMenuDismiss = React.useCallback(() => courseClassPlayerStore.unblockShowControls("volume"), []);
	const handleMenuOpened = React.useCallback(() => courseClassPlayerStore.blockShowControls("volume"), []);

	const RenderMenuListWithProps = useComponentWithProps(RenderMenuList, { classNames });

	const handleRenderMenuList: IContextualMenuProps["onRenderMenuList"] = React.useCallback(
		(props, defaultRenderer) =>
			props && defaultRenderer ? (
				<RenderMenuListWithProps menuListProps={props} defaultRenderer={defaultRenderer} />
			) : null,
		[]
	);

	const calloutProps: Partial<ICalloutProps> = React.useMemo(
		() => ({
			layerProps: {
				hostId: observedCourseClassPlayerStore.isFullscreen ? "course-class-player-controls" : undefined,
			},
		}),
		[observedCourseClassPlayerStore.isFullscreen]
	);

	const menuProps: IContextualMenuProps = {
		items: menuItems,
		directionalHint: DirectionalHint.topCenter,
		contextualMenuItemAs,
		onMenuOpened: handleMenuOpened,
		onDismiss: handleMenuDismiss,
		onRenderMenuList: handleRenderMenuList,
		styles: classNames.subComponentStyles.menu,
		calloutProps,
	};

	const CommandBarButtonIconWithProps = useComponentWithProps(CommandBarButtonIcon, { classNames });

	const handleKeyDown = React.useCallback<React.KeyboardEventHandler<unknown>>((e) => {
		if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

		if (appStore.isFocusVisible()) {
			const spacebarKey: keyof typeof keyboardKey = " ";

			if (keyboardKey.getKey(e) === spacebarKey) {
				(e.currentTarget as HTMLButtonElement).click();
				e.preventDefault();
			}

			return;
		}

		const shortcuts = getCourseClassPlayerShortcuts(courseClassPlayerStore);
		const shortcut = shortcuts[keyboardKey.getKey(e) as keyof typeof keyboardKey];

		if (shortcut) {
			shortcut();
			e.preventDefault();
		}
	}, []);

	return (
		<CourseClassPlayerButton buttonProps={{ menuProps, onKeyDown: handleKeyDown, onRenderMenuIcon: () => null }}>
			<CommandBarButtonIconWithProps />
		</CourseClassPlayerButton>
	);
};
