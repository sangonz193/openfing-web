import { LayerHost, Link, MessageBar, MessageBarType, Spinner, SpinnerSize, Stack, Text } from "@fluentui/react"
import { wait } from "@sangonz193/utils/wait"
import keyboardKey from "keyboard-key"
import throttle from "lodash/throttle"
import React from "react"
import { useResizeDetector } from "react-resize-detector"

import { useAppStore } from "../../../../../app"
import { CLOSE_CIRCLE_OUTLINE_ICON_NAME } from "../../../../../components/Icon/close-circle-outline.generated"
import { INFORMATION_CIRCLE_OUTLINE_ICON_NAME } from "../../../../../components/Icon/information-circle-outline.generated"
import type { CourseClassPlayerStore } from "../../../../../courseClassPlayer"
import { useCourseClassPlayerStore } from "../../../../../courseClassPlayer"
import { getCourseClassPlayerShortcuts } from "../../../../../courseClassPlayer/getCourseClassPlayerShortcuts"
import { useDoubleClick } from "../../../../../hooks/useDoubleClick"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { useRootEventListener } from "../../../../../rootEventListeners"
import { CourseClassPlayerControlsBottomControls } from "../CourseClassPlayerControlsBottomControls"
import { CourseClassPlayerVideo } from "../CourseClassPlayerVideo"
import type { CourseClassPlayerCourseClassVideoFragment } from "./CourseClassPlayer.urqlGraphql.generated"
import { useCourseClassPlayerStyles } from "./useCourseClassPlayerStyles"

export type CourseClassPlayerProps = {
	children?: undefined
	className?: string
	courseClassVideo?: CourseClassPlayerCourseClassVideoFragment
	liveState: boolean
	loadingCourseClassVideo: boolean
}

function getEventHandler(
	courseClassPlayerStore: CourseClassPlayerStore
): (e: KeyboardEvent | React.KeyboardEvent) => void {
	return (e) => {
		if (e.defaultPrevented || !courseClassPlayerStore.loaded || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
			return
		}

		const handler =
			getCourseClassPlayerShortcuts(courseClassPlayerStore)[keyboardKey.getKey(e) as keyof typeof keyboardKey]

		if (handler) {
			handler()
			e.preventDefault()
		}
	}
}

const CourseClassPlayerComponent: React.FC<CourseClassPlayerProps> = ({
	className,
	courseClassVideo,
	loadingCourseClassVideo,
	liveState,
}) => {
	const appStore = useAppStore()
	const { inputType } = useObservableStates(appStore, ["inputType"])
	const courseClassPlayerStore = useCourseClassPlayerStore()

	const handleKeyDown = React.useCallback<React.KeyboardEventHandler>((e) => {
		if (!e.defaultPrevented && appStore.isFocusVisible) {
			courseClassPlayerStore.showControlsFor("controls-keyboard", 1000)
		}

		getEventHandler(courseClassPlayerStore)(e)
	}, [])
	useRootEventListener("onKeyDown", handleKeyDown)

	const { isFullscreen, loaded, seeking, showControls, waiting } = useObservableStates(courseClassPlayerStore, [
		"isFullscreen",
		"showControls",
		"loaded",
		"waiting",
		"seeking",
	])

	const showControlsForId = "controls-player"
	const showControlsFor = () => courseClassPlayerStore.showControlsFor(showControlsForId, 3000)

	const togglePlayTimeoutRef = React.useRef<NodeJS.Timeout>()
	const handleWrapperClick = React.useCallback<React.MouseEventHandler>((e) => {
		if (e.defaultPrevented) {
			return
		}
		e.preventDefault()

		if (typeof togglePlayTimeoutRef.current === "number") {
			// double click
			clearTimeout(togglePlayTimeoutRef.current)
			togglePlayTimeoutRef.current = undefined

			if (courseClassPlayerStore.loaded.getValue()) {
				courseClassPlayerStore.toggleFullscreen()
			}
		} else {
			const newTimeout = setTimeout(() => {
				if (appStore.inputType.getValue() === "TOUCH") {
					if (courseClassPlayerStore.isBlockingShowControls(showControlsForId)) {
						courseClassPlayerStore.unblockShowControls(showControlsForId)
					} else {
						showControlsFor()
					}
				} else {
					courseClassPlayerStore.togglePlay()
				}

				if (newTimeout === togglePlayTimeoutRef.current) {
					togglePlayTimeoutRef.current = undefined
				}
			}, 300)
			togglePlayTimeoutRef.current = newTimeout
		}
	}, [])

	const [throttleShowControlsFor] = React.useState(() => throttle(() => showControlsFor(), 1000))
	const handleMouseMove = React.useCallback(() => {
		throttleShowControlsFor()
	}, [])

	const handleFocus = React.useCallback<React.FocusEventHandler>(() => {
		if (appStore.isFocusVisible.getValue()) {
			courseClassPlayerStore.showControlsFor("controls-keyboard", 2000)
		}
	}, [])

	const [height, setHeight] = React.useState(0)
	const handleResize = React.useCallback<(width?: number) => void>((width) => {
		setHeight((9 * (width ?? 0)) / 16)
	}, [])

	const [showNativeControls, setShowNativeControls] = React.useState(true)

	React.useLayoutEffect(() => {
		if (resizeDetectorTargetRef.current) {
			handleResize(resizeDetectorTargetRef.current.getBoundingClientRect().width)
		}

		;(async () => {
			const audio = new Audio()
			audio.volume = 0.5 // has no effect on iOS
			await wait()
			setShowNativeControls(audio.volume === 1)
		})()
	}, [])

	React.useEffect(() => {
		if (loaded) {
			courseClassPlayerStore.showControlsFor("player", 2000)
		}
	}, [loaded])

	const styles = useCourseClassPlayerStyles({
		className,
		fullscreen: isFullscreen,
		hideCursor: !showControls && isFullscreen,
	})

	const resizeDetectorTargetRef = React.useRef<HTMLDivElement>(null)
	useResizeDetector({
		targetRef: resizeDetectorTargetRef,
		skipOnMount: true,
		handleWidth: true,
		onResize: handleResize,
	})

	React.useEffect(() => {
		courseClassPlayerStore.setVideoWrapperInstance(resizeDetectorTargetRef.current)
	}, [])

	const handleLeftClick = useDoubleClick({
		onDoubleClick: React.useCallback(() => {
			const isBlockingControls = courseClassPlayerStore.isBlockingShowControls(showControlsForId)

			courseClassPlayerStore.setCurrentTime(courseClassPlayerStore.currentTime.getValue() - 10)

			if (isBlockingControls) {
				courseClassPlayerStore.showControlsFor(showControlsForId, 3000)
			}
		}, []),
		onClick: React.useCallback(() => {
			const isBlockingControls = courseClassPlayerStore.isBlockingShowControls(showControlsForId)

			if (isBlockingControls) {
				courseClassPlayerStore.unblockShowControls(showControlsForId)
			} else {
				courseClassPlayerStore.showControlsFor(showControlsForId, 3000)
			}
		}, []),
	})

	const handleRightClick = useDoubleClick({
		onDoubleClick: React.useCallback(() => {
			const isBlockingControls = courseClassPlayerStore.isBlockingShowControls(showControlsForId)

			courseClassPlayerStore.setCurrentTime(courseClassPlayerStore.currentTime.getValue() + 10)

			if (isBlockingControls) {
				courseClassPlayerStore.showControlsFor(showControlsForId, 3000)
			}
		}, []),
		onClick: React.useCallback(() => {
			const isBlockingControls = courseClassPlayerStore.isBlockingShowControls(showControlsForId)

			if (isBlockingControls) {
				courseClassPlayerStore.unblockShowControls(showControlsForId)
			} else {
				courseClassPlayerStore.showControlsFor(showControlsForId, 3000)
			}
		}, []),
	})

	const loading: boolean = seeking || loadingCourseClassVideo
	const formats = courseClassVideo?.qualities[0]?.formats
	const showNoVideoError: boolean = (!loadingCourseClassVideo && (!formats || formats.length === 0)) || liveState

	return (
		<div
			ref={resizeDetectorTargetRef}
			className={styles.wrapper}
			onKeyDown={handleKeyDown}
			onClick={handleWrapperClick}
			onMouseMove={inputType !== "TOUCH" ? handleMouseMove : undefined}
			tabIndex={0}
			onFocus={handleFocus}
			style={isFullscreen || !height ? undefined : { height, maxHeight: "70vh" }}
		>
			{formats && !liveState && <CourseClassPlayerVideo formats={formats} controls={showNativeControls} />}

			{(loading || waiting) && !showNoVideoError && (
				<Spinner size={SpinnerSize.large} className={styles.spinner} />
			)}

			{!showNativeControls && (
				<div className={styles.controlsWrapper}>
					{inputType === "TOUCH" && (
						<>
							<button disabled={!loaded} className={styles.leftTapArea} onClick={handleLeftClick} />
							<button disabled={!loaded} className={styles.rightTapArea} onClick={handleRightClick} />
						</>
					)}

					<CourseClassPlayerControlsBottomControls className={styles.bottomControls} />

					<LayerHost id="course-class-player-controls" className={styles.layerHost} />
				</div>
			)}

			{showNoVideoError && !liveState && (
				<Stack className={styles.messageBarContainer}>
					<MessageBar
						className={styles.messageBar}
						messageBarType={MessageBarType.error}
						messageBarIconProps={{
							iconName: CLOSE_CIRCLE_OUTLINE_ICON_NAME,
							className: styles.messageBarContainerIcon,
						}}
					>
						<Stack disableShrink>
							<Text variant="xLarge" style={{ lineHeight: "normal" }}>
								No se pudo obtener la información de reproducción de la clase.
							</Text>

							<Text variant="mediumPlus" style={{ marginTop: 10, lineHeight: "normal" }}>
								Prueba actualizar la página. Si no se soluciona, puedes avisarnos del error al{" "}
								<Link href="mailto:open@fing.edu.uy">open@fing.edu.uy</Link>
							</Text>
						</Stack>
					</MessageBar>
				</Stack>
			)}

			{showNoVideoError && liveState && (
				<Stack className={styles.messageBarContainer}>
					<MessageBar
						className={styles.messageBar}
						messageBarType={MessageBarType.info}
						messageBarIconProps={{
							iconName: INFORMATION_CIRCLE_OUTLINE_ICON_NAME,
							className: styles.messageBarContainerIcon,
						}}
					>
						<Stack disableShrink>
							<Text variant="xLarge" style={{ lineHeight: "normal" }}>
								La clase no tiene información de reproducción
							</Text>

							<Text variant="mediumPlus" style={{ marginTop: 10, lineHeight: "normal" }}>
								Prueba actualizar la página más cerca al momento de iniciar la clase.
							</Text>
						</Stack>
					</MessageBar>
				</Stack>
			)}
		</div>
	)
}

export const CourseClassPlayer = React.memo(CourseClassPlayerComponent)
