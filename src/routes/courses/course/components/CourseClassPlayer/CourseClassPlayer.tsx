import { useReactiveVar } from "@apollo/client"
import { LayerHost, Spinner, SpinnerSize } from "@fluentui/react"
import keyboardKey from "keyboard-key"
import throttle from "lodash/throttle"
import React from "react"
import { useResizeDetector } from "react-resize-detector"

import { getCourseClassPlayerShortcuts } from "../../../../../_utils/getCourseClassPlayerShortcuts"
import { Div } from "../../../../../components/Div"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useAppStore } from "../../../../../modules/App"
import { CourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useRootEventListener } from "../../../../../modules/RootEventListeners"
import { CourseClassPlayerControlsBottomControls } from "../CourseClassPlayerControlsBottomControls"
import { CourseClassPlayerVideo } from "../CourseClassPlayerVideo"
import { CourseClassPlayerCourseClassVideoFragment } from "./CourseClassPlayer.graphql.generated"
import { useCourseClassPlayerStyles } from "./useCourseClassPlayerStyles"

export type CourseClassPlayerProps = {
	children?: undefined
	className?: string
	courseClassVideo: CourseClassPlayerCourseClassVideoFragment
}

function getEventHandler(
	courseClassPlayerStore: CourseClassPlayerStore
): (e: KeyboardEvent | React.KeyboardEvent) => void {
	return (e) => {
		if (e.defaultPrevented || !courseClassPlayerStore.loaded || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
			return
		}

		const handler = getCourseClassPlayerShortcuts(courseClassPlayerStore)[
			keyboardKey.getKey(e) as keyof typeof keyboardKey
		]

		if (handler) {
			handler()
			e.preventDefault()
		}
	}
}

const CourseClassPlayerComponent: React.FC<CourseClassPlayerProps> = ({ className, courseClassVideo }) => {
	const appStore = useAppStore()
	const inputType = useReactiveVar(appStore.inputType)
	const courseClassPlayerStore = useCourseClassPlayerStore()

	const handleKeyDown = React.useCallback<React.KeyboardEventHandler>((e) => {
		if (!e.defaultPrevented && appStore.isFocusVisible) {
			courseClassPlayerStore.showControlsFor("controls-keyboard", 1000)
		}

		getEventHandler(courseClassPlayerStore)(e)
	}, [])
	useRootEventListener("onKeyDown", handleKeyDown)

	const { isFullscreen, loaded, seeking, showControls, waiting } = useReactiveVars(courseClassPlayerStore, [
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

			courseClassPlayerStore.toggleFullscreen()
		} else {
			const newTimeout = setTimeout(() => {
				if (appStore.inputType() === "TOUCH") {
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
		if (appStore.isFocusVisible()) {
			courseClassPlayerStore.showControlsFor("controls-keyboard", 2000)
		}
	}, [])

	const [height, setHeight] = React.useState(0)
	const handleResize = React.useCallback<(width?: number) => void>((width) => {
		setHeight((9 * (width ?? 0)) / 16)
	}, [])

	React.useLayoutEffect(() => {
		const htmlVideoWrapperElement = courseClassPlayerStore.htmlVideoWrapperElement()
		if (htmlVideoWrapperElement) {
			handleResize(htmlVideoWrapperElement.getBoundingClientRect().width)
		}
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
	})

	return (
		<Div
			ref={resizeDetectorTargetRef}
			className={styles.wrapper}
			onKeyDown={handleKeyDown}
			onClick={handleWrapperClick}
			onMouseMove={inputType !== "TOUCH" ? handleMouseMove : undefined}
			tabIndex={0}
			onFocus={handleFocus}
			style={isFullscreen || !height ? undefined : { height }}
		>
			{!!courseClassVideo.qualities?.length && (
				<CourseClassPlayerVideo formats={courseClassVideo.qualities[0].formats} />
			)}

			{(!loaded || waiting || seeking) && <Spinner size={SpinnerSize.large} className={styles.spinner} />}

			{loaded && (
				<div className={styles.controlsWrapper}>
					<CourseClassPlayerControlsBottomControls className={styles.bottomControls} />

					<LayerHost id="course-class-player-controls" className={styles.layerHost} />
				</div>
			)}
		</Div>
	)
}

export const CourseClassPlayer = React.memo(CourseClassPlayerComponent)
