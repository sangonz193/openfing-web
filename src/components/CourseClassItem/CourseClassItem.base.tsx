import { Text } from "@fluentui/react/lib/Text";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import { useReactiveVars } from "../../hooks/useReactiveVars";
import { useCourseSelectionStore } from "../../modules/CourseSelection";
import { routeConfigMap } from "../../routeConfigMap";
import { Link } from "../Link";
import { CourseClassItemProps, CourseClassItemStyleProps, CourseClassItemStyles } from "./CourseClassItem.types";

const getClassNames = classNamesFunction<CourseClassItemStyleProps, CourseClassItemStyles>();

export const CourseClassItemBase = (props: CourseClassItemProps) => {
	const { courseClass } = props;

	const courseClassNo = courseClass.number;
	const courseClassListCode = courseClass.courseClassList?.code;
	const url = React.useMemo(
		() =>
			courseClassListCode && courseClassNo
				? routeConfigMap.course.path({
						courseClassListCode,
						courseClassNo,
				  })
				: "",
		[courseClassListCode, courseClassNo]
	);

	const isActive =
		courseClass.id === useReactiveVars(useCourseSelectionStore(), ["selection"]).selection.courseClassId;

	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, isActive });

	return (
		<Link className={classNames.root} anchorProps={{ href: url }}>
			<div className={classNames.content}>
				<Text styles={classNames.subComponentStyles.courseClassNumber}>{props.courseClass.number}</Text>

				<span> </span>

				<Text styles={classNames.subComponentStyles.courseClassName}>{props.courseClass.name}</Text>
			</div>
		</Link>
	);
};
