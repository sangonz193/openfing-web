import { Image, ImageFit } from "@fluentui/react/lib/Image";
import { Text } from "@fluentui/react/lib/Text";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import { routeConfigMap } from "../../routeConfigMap";
import { Link } from "../Link";
import { CourseItemProps, CourseItemStyleProps, CourseItemStyles } from "./CourseItem.types";

const getClassNames = classNamesFunction<CourseItemStyleProps, CourseItemStyles>();

export const CourseItemBase = (props: CourseItemProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className });

	const { course } = props;

	const courseClassListCode = course.editions[0]?.courseClassLists[0]?.code;
	const url = React.useMemo(() => routeConfigMap.course.path({ courseClassListCode }), [courseClassListCode]);
	const latestEdition = course.editions.length
		? course.editions.reduce((e1, e2) => (e1.year && e2.year && e1.year > e2.year ? e1 : e2))
		: undefined;

	return (
		<Link className={classNames.root} anchorProps={{ href: url }}>
			<div className={classNames.imageContainer}>
				{course?.iconUrl && (
					<Image
						styles={classNames.subComponentStyles.image}
						src={course?.iconUrl}
						imageFit={ImageFit.contain}
					/>
				)}
			</div>

			<div className={classNames.infoContainer}>
				<Text variant="large">{course.name}</Text>

				<Text styles={classNames.subComponentStyles.year}>{latestEdition?.year}</Text>
			</div>
		</Link>
	);
};
