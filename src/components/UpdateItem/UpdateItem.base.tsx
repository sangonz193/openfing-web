import { Image, ImageFit } from "@fluentui/react/lib/Image";
import { Text } from "@fluentui/react/lib/Text";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import { routeConfigMap } from "../../routeConfigMap";
import { Link } from "../Link";
import { UpdateItemProps, UpdateItemStyleProps, UpdateItemStyles } from "./UpdateItem.types";

const getClassNames = classNamesFunction<UpdateItemStyleProps, UpdateItemStyles>();

export const UpdateItemBase = (props: UpdateItemProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className });

	const { courseClass } = props;

	const { courseClassList } = courseClass;
	const course = courseClassList?.courseEdition?.course;

	const url = React.useMemo(
		() =>
			courseClass.number && courseClassList?.code
				? routeConfigMap.course.path({
						courseClassListCode: courseClassList.code,
						courseClassNo: courseClass.number,
				  })
				: "",
		[courseClassList?.code, courseClass.number]
	);

	const name = React.useMemo(() => {
		if (!courseClass.name) return "";

		if (!courseClass.number) return courseClass.name;

		return `${courseClass.number} - ${courseClass.name}`;
	}, [courseClass.number, courseClass.name]);

	const createdAt = React.useMemo(
		() =>
			(courseClass.createdAt &&
				new Intl.DateTimeFormat("es-UY", {
					day: "numeric",
					month: "numeric",
				}).format(new Date(courseClass.createdAt))) ||
			null,
		[courseClass.createdAt]
	);

	return (
		<Link className={classNames.root} anchorProps={{ href: url }}>
			<div className={classNames.iconContainer}>
				{course?.iconUrl && (
					<Image
						styles={classNames.subComponentStyles.image}
						src={course?.iconUrl}
						imageFit={ImageFit.contain}
					/>
				)}
			</div>

			<div className={classNames.infoContainer}>
				<Text styles={classNames.subComponentStyles.courseName}>{course?.name}</Text>

				<Text variant="large">{name}</Text>

				{createdAt && <Text styles={classNames.subComponentStyles.createdAt}>{createdAt}</Text>}
			</div>
		</Link>
	);
};
