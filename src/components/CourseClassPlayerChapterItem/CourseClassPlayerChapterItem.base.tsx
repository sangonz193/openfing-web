import { Text } from "@fluentui/react";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import { autorun } from "mobx";
import React from "react";

import { secondsToString } from "../../_utils/secondsToString";
import { useObserveProperties } from "../../hooks/useObserveProperties";
import { useCourseClassPlayerStore } from "../../modules/CourseClassPlayer";
import { useCourseSelectionStore } from "../../modules/CourseSelection";
import { routeConfigMap } from "../../routeConfigMap";
import { Link } from "../Link";
import {
	CourseClassPlayerChapterItemProps,
	CourseClassPlayerChapterItemStyleProps,
	CourseClassPlayerChapterItemStyles,
} from "./CourseClassPlayerChapterItem.types";

const getClassNames = classNamesFunction<CourseClassPlayerChapterItemStyleProps, CourseClassPlayerChapterItemStyles>();

export const CourseClassPlayerChapterItemBase = (props: CourseClassPlayerChapterItemProps) => {
	const { vttCue } = props;

	const courseClassPlayerStore = useCourseClassPlayerStore();
	const [isActive, setIsActive] = React.useState(false);

	React.useEffect(() => {
		const listener = autorun(() => {
			const newIsActive = courseClassPlayerStore.activeChapterTextTracks.some(
				(activeTextTrack) => activeTextTrack.id === vttCue.id
			);

			if (isActive !== newIsActive) setIsActive(newIsActive);
		});

		return () => listener();
	}, [vttCue.id, isActive]);

	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className, isActive });

	const courseSelectionStore = useCourseSelectionStore();
	const { selection } = useObserveProperties(courseSelectionStore, ["selection"]);
	const { courseClassListCode, courseClassNumber } = useObserveProperties(selection, [
		"courseClassListCode",
		"courseClassNumber",
	]);

	const href = React.useMemo(
		() =>
			(courseClassListCode !== undefined &&
				courseClassNumber !== undefined &&
				routeConfigMap.course.path({
					courseClassListCode,
					courseClassNo: courseClassNumber,
					startOnSeconds: vttCue.startTime,
					endOnSeconds: vttCue.endTime,
				})) ||
			"",
		[courseClassListCode, courseClassNumber, vttCue.startTime, vttCue.endTime]
	);

	const handleClick = React.useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();

			if (!e.ctrlKey && !e.metaKey) {
				courseClassPlayerStore.setCurrentTime(vttCue.startTime);
				props.requestClosePanel();
			} else window.open(href, "__blank");
		},
		[vttCue.startTime, props.requestClosePanel]
	);

	return (
		<Link styles={classNames.subComponentStyles.link} anchorProps={{ href: href || "", onClick: handleClick }}>
			<div className={classNames.activeIndicator} />

			<div>
				<Text styles={classNames.subComponentStyles.seconds}>{secondsToString(vttCue.startTime)}</Text>

				<br />

				<Text>{vttCue.text}</Text>
			</div>
		</Link>
	);
};
