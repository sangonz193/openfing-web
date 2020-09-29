import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";
import { useObserveProperties } from "src/hooks/useObserveProperties";

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
	const { isFullscreen, urlHash } = useObserveProperties(courseClassPlayerStore, ["isFullscreen", "urlHash"]);

	const videoRef = React.useRef<HTMLVideoElement>(null);

	React.useEffect(() => {
		courseClassPlayerStore.setVideoInstance(videoRef.current);
		videoRef.current?.load();

		if (videoRef.current) {
			const video = videoRef.current;

			const handler = () => {
				let id = 1;

				// TODO: get from server
				const dataSource: Array<[number, number, string]> = formats.some(
					(format) => format.url === "https://openfing-video.fing.edu.uy/media/gal119/gal119_01.webm"
				)
					? [
							[10 * 60, 14 * 60 + 47, "Definición de sistema lineal"],
							[14 * 60 + 48, 19 * 60 - 1, "Definición de solución y de conjunto solución"],
							[19 * 60 + 58, 23 * 60 + 56, "Ejemplo 1"],
							[23 * 60 + 57, 29 * 60 + 9, "Ejemplo 2"],
							[29 * 60 + 10, 31 * 60 + 40, "Ejemplo 3"],
							[
								31 * 60 + 41,
								34 * 60 + 49,
								"Definición: Sistemas compatibles determinados (SCD), Sistemas compatibles indeterminados (SCI) y Sistemas incompatibles (SI)",
							],
							[34 * 60 + 50, 42 * 60 + 15, "Comienza con el método de escalerización"],
							[42 * 60 + 16, 43 * 60 + 19, "Paso de recursión"],
							[53 * 60 + 3, 1 * 60 * 60 + 1 * 60 + 40, "Definición de las transformaciones elementales"],
							[1 * 60 * 60 + 1 * 60 + 41, 1 * 60 * 60 + 5 * 60 + 2, "Demostración del teorema"],
					  ]
					: [];

				courseClassPlayerStore.setChapterTextTracks(
					dataSource.map((cueData) => {
						const vvtCue = new VTTCue(cueData[0], cueData[1], cueData[2]);
						vvtCue.id = `${id++}`;
						return vvtCue;
					})
				);
			};

			video.addEventListener("loadedmetadata", handler);

			return () => video.removeEventListener("loadedmetadata", handler);
		}

		return undefined;
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
