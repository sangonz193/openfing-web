import React from "react";

import { useReactiveVars } from "../../../../../hooks/useReactiveVars";
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer";
import { CourseClassPlayerVideoCourseClassVideoFormatFragment } from "./CourseClassPlayerVideo.graphql.generated";
import { useCourseClassPlayerVideoStyles } from "./useCourseClassPlayerVideoStyles";

export type CourseClassPlayerVideoProps = {
	children?: undefined;
	className?: string;
	formats: CourseClassPlayerVideoCourseClassVideoFormatFragment[];
};

const CourseClassPlayerVideoComponent: React.FC<CourseClassPlayerVideoProps> = ({ className, formats }) => {
	const courseClassPlayerStore = useCourseClassPlayerStore();
	const { isFullscreen, urlHash } = useReactiveVars(courseClassPlayerStore, ["isFullscreen", "urlHash"]);

	const videoRef = React.useRef<HTMLVideoElement>(null);

	React.useEffect(() => {
		courseClassPlayerStore.setVideoInstance(videoRef.current);
		videoRef.current?.load();
	}, [formats]);

	const styles = useCourseClassPlayerVideoStyles({
		className,
		fullscreen: isFullscreen,
	});

	return (
		<video ref={videoRef} className={styles.wrapper} autoPlay>
			{formats &&
				formats.map((format) => format.url && <source key={format.id} src={format.url + (urlHash || "")} />)}
		</video>
	);
};

export const CourseClassPlayerVideo = React.memo(CourseClassPlayerVideoComponent);
