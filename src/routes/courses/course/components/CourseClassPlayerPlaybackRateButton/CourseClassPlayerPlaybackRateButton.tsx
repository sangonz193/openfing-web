import type { ICalloutProps, IContextualMenuItem, IContextualMenuProps } from "@fluentui/react"
import { DirectionalHint, FocusTrapZone, Stack, Text } from "@fluentui/react"
import keyboardKey from "keyboard-key"
import React from "react"

import { getCourseClassPlayerShortcuts } from "../../../../../_utils/getCourseClassPlayerShortcuts"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { useAppStore } from "../../../../../modules/App"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useIsPlayerLoaded } from "../../hooks/useIsPlayerLoaded"
import type { CourseClassPlayerButtonProps } from "../CourseClassPlayerButton"
import { CourseClassPlayerButton } from "../CourseClassPlayerButton"
import { CourseClassPlayerPlaybackRateContextMenuSlider } from "../CourseClassPlayerPlaybackRateContextMenuSlider"
import { CourseClassPlayerPlaybackRateMenuItem } from "../CourseClassPlayerPlaybackRateMenuItem"
import { useCourseClassPlayerPlaybackRateButtonStyles } from "./useCourseClassPlayerPlaybackRateButtonStyles"

const courseClassPlayerControlsBlockerId = "course-class-player-controls"

export type CourseClassPlayerPlaybackRateButtonProps = {
	children?: undefined
}

const playbackRates: number[] = []
for (let i = 8; i > 0; i--) {
	playbackRates.push(i * 0.25)
}

const CourseClassPlayerPlaybackRateButtonComponent: React.FC<CourseClassPlayerPlaybackRateButtonProps> = ({}) => {
	const styles = useCourseClassPlayerPlaybackRateButtonStyles({})

	const appStore = useAppStore()
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const { isFullscreen, playbackRate } = useObservableStates(courseClassPlayerStore, ["isFullscreen", "playbackRate"])

	const menuItems: IContextualMenuItem[] = React.useMemo(
		() =>
			playbackRates.map((r) => ({
				key: r.toString(),
				data: r,
				onClick: () => courseClassPlayerStore.setPlaybackRate(r),
			})),
		[]
	)

	const contextualMenuItemAs: IContextualMenuProps["contextualMenuItemAs"] = React.useCallback(
		(props) => <CourseClassPlayerPlaybackRateMenuItem contextualMenuItemProps={props} />,
		[]
	)

	const handleMenuDismiss = React.useCallback(() => courseClassPlayerStore.unblockShowControls("volume"), [])
	const handleMenuOpened = React.useCallback(() => courseClassPlayerStore.blockShowControls("volume"), [])

	const handleRenderMenuList: IContextualMenuProps["onRenderMenuList"] = React.useCallback(
		(props, defaultRenderer) =>
			props && defaultRenderer ? (
				<FocusTrapZone isClickableOutsideFocusTrap>
					<Stack className={styles.renderMenuListWrapper}>
						<Stack className={styles.renderMenuListDefaultRendererContainer}>
							{defaultRenderer && props && defaultRenderer(props)}
						</Stack>

						<Stack className={styles.renderMenuListSeparator} />

						<CourseClassPlayerPlaybackRateContextMenuSlider />
					</Stack>
				</FocusTrapZone>
			) : null,
		[styles]
	)

	const calloutProps: Partial<ICalloutProps> = React.useMemo(
		() => ({
			layerProps: {
				hostId: isFullscreen ? courseClassPlayerControlsBlockerId : undefined,
			},
		}),
		[isFullscreen]
	)

	const _menuProps: IContextualMenuProps = {
		items: menuItems,
		directionalHint: DirectionalHint.topCenter,
		contextualMenuItemAs,
		onMenuOpened: handleMenuOpened,
		onDismiss: handleMenuDismiss,
		onRenderMenuList: handleRenderMenuList,
		className: styles.menu,
		calloutProps,
	}
	const menuProps = React.useMemo(() => _menuProps, Object.values(_menuProps))

	const handleKeyDown = React.useCallback<React.KeyboardEventHandler<unknown>>((e) => {
		if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
			return
		}

		if (appStore.isFocusVisible.getValue()) {
			const spaceBarKey: keyof typeof keyboardKey = " "

			if (keyboardKey.getKey(e) === spaceBarKey) {
				;(e.currentTarget as HTMLButtonElement).click()
				e.preventDefault()
			}

			return
		}

		const shortcuts = getCourseClassPlayerShortcuts(courseClassPlayerStore)
		const shortcut = shortcuts[keyboardKey.getKey(e) as keyof typeof keyboardKey]

		if (shortcut) {
			shortcut()
			e.preventDefault()
		}
	}, [])

	const isPlayerLoaded = useIsPlayerLoaded()
	const buttonProps = React.useMemo<CourseClassPlayerButtonProps["buttonProps"]>(
		() => ({
			disabled: !isPlayerLoaded,
			menuProps,
			onKeyDown: handleKeyDown,
			onRenderMenuIcon: () => null,
		}),
		[isPlayerLoaded, menuProps, handleKeyDown]
	)

	return (
		<CourseClassPlayerButton className={styles.button} buttonProps={buttonProps}>
			<Text className={styles.commandButtonText}>
				{playbackRate.toLocaleString(undefined, { minimumFractionDigits: 1 }).replace(",", ".")}x
			</Text>
		</CourseClassPlayerButton>
	)
}

export const CourseClassPlayerPlaybackRateButton = React.memo(CourseClassPlayerPlaybackRateButtonComponent)
