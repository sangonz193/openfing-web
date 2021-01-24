import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import { useReactiveVars } from "../../hooks/useReactiveVars";
import { useCourseClassPlayerStore } from "../../modules/CourseClassPlayer";
import {
	CourseClassPlayerVideoProps,
	CourseClassPlayerVideoStyleProps,
	CourseClassPlayerVideoStyles,
} from "./CourseClassPlayerVideo.types";

const getClassNames = classNamesFunction<CourseClassPlayerVideoStyleProps, CourseClassPlayerVideoStyles>();

export const CourseClassPlayerVideoBase = (props: CourseClassPlayerVideoProps) => {
	const { formats } = props;
	const courseClassPlayerStore = useCourseClassPlayerStore();
	const { isFullscreen, urlHash } = useReactiveVars(courseClassPlayerStore, ["isFullscreen", "urlHash"]);

	const videoRef = React.useRef<HTMLVideoElement>(null);

	React.useEffect(() => {
		courseClassPlayerStore.setVideoInstance(videoRef.current);
		videoRef.current?.load();
	}, [formats]);

	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, isFullscreen });

	return (
		<video ref={videoRef} className={classNames.root} autoPlay>
			{formats &&
				formats.map((format) => (
					<source key={format.id} src={format.url + (urlHash || "")} type={`video/${format.name}`} />
				))}
		</video>
	);
};
