import React from "react"

import { useCourseClassPlayerStore } from "../../../../../courseClassPlayer"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import type { CourseClassPlayerVideoCourseClassVideoFormatFragment } from "./CourseClassPlayerVideo.urqlGraphql.generated"
import { useCourseClassPlayerVideoStyles } from "./useCourseClassPlayerVideoStyles"

export type CourseClassPlayerVideoProps = {
	children?: undefined
	className?: string
	controls: boolean
	formats: CourseClassPlayerVideoCourseClassVideoFormatFragment[]
}

const CourseClassPlayerVideoComponent: React.FC<CourseClassPlayerVideoProps> = ({ className, formats, controls }) => {
	const courseClassPlayerStore = useCourseClassPlayerStore()
	const { isFullscreen, urlHash } = useObservableStates(courseClassPlayerStore, ["isFullscreen", "urlHash"])

	const videoRef = React.useRef<HTMLVideoElement>(null)

	React.useEffect(() => {
		courseClassPlayerStore.setVideoInstance(videoRef.current)
		videoRef.current?.load()

		return () => {
			courseClassPlayerStore.setVideoInstance(videoRef.current)
		}
	}, [formats])

	const styles = useCourseClassPlayerVideoStyles({
		className,
		fullscreen: isFullscreen,
	})

	return (
		<video ref={videoRef} className={styles.wrapper} autoPlay playsInline controls={controls}>
			{formats &&
				formats.map((format) => format.url && <source key={format.id} src={format.url + (urlHash || "")} />)}
		</video>
	)
}

export const CourseClassPlayerVideo = React.memo(CourseClassPlayerVideoComponent)
