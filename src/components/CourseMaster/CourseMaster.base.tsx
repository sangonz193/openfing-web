import { Dropdown, IDropdownOption, IDropdownProps, ResponsiveMode } from "@fluentui/react/lib/Dropdown";
import { FocusZone, FocusZoneDirection } from "@fluentui/react/lib/FocusZone";
import { IListProps, List } from "@fluentui/react/lib/List";
import { Separator } from "@fluentui/react/lib/Separator";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";
import { useHistory } from "src/hooks/useHistory";
import { useObserveProperties } from "src/hooks/useObserveProperties";

import { useCourseSelectionStore } from "../../modules/CourseSelection";
import { routeConfigMap } from "../../routeConfigMap";
import { CourseClassItem } from "../CourseClassItem";
import { CourseClassItemCourseClassFragment } from "../CourseClassItem/CourseClassItem.graphql.generated";
import { useCourseClassListByCodeQuery, useCourseClassListClassesByCodeQuery } from "./CourseMaster.graphql.generated";
import { CourseMasterProps, CourseMasterStyleProps, CourseMasterStyles } from "./CourseMaster.types";

const getClassNames = classNamesFunction<CourseMasterStyleProps, CourseMasterStyles>();

export const CourseMasterBase = (props: CourseMasterProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;

	const history = useHistory();
	const { selection } = useObserveProperties(useCourseSelectionStore(), ["selection"]);
	const { courseClassListCode, courseClassListId } = useObserveProperties(selection, [
		"courseClassListCode",
		"courseClassListId",
	]);

	const courseEditionsResponse = useCourseClassListByCodeQuery({
		variables: courseClassListCode
			? {
					code: courseClassListCode,
			  }
			: undefined,
		skip: !courseClassListCode,
	});

	const courseEditions =
		courseEditionsResponse.data?.courseClassListByCode?.__typename === "CourseClassList"
			? courseEditionsResponse.data?.courseClassListByCode?.courseEdition?.course?.editions
			: undefined;
	const editionsDropdownOptions: IDropdownOption[] = React.useMemo(
		() => (courseEditions ? courseEditions.map((e) => ({ key: e.id, text: e.name || "" })) : []),
		[courseEditions]
	);

	const _courseEdition =
		courseEditionsResponse.data?.courseClassListByCode?.__typename === "CourseClassList"
			? courseEditionsResponse.data?.courseClassListByCode.courseEdition
			: undefined;
	const courseEdition = _courseEdition && courseEditions && courseEditions.find((c) => c.id === _courseEdition.id);

	const handleCourseEditionChange = React.useCallback<Required<IDropdownProps>["onChange"]>(
		(_, option) => {
			if (!option) return;

			const courseEdition = (courseEditions || undefined)?.find((ce) => ce.id === option.key);
			const courseClassList = courseEdition?.courseClassLists?.length && courseEdition.courseClassLists[0];

			if (!courseClassList) return;

			history.replace(
				routeConfigMap.course.path({
					courseClassListCode: courseClassList.code,
				})
			);
		},
		[courseEditions]
	);

	const courseClassesResponse = useCourseClassListClassesByCodeQuery({
		variables: courseClassListCode
			? {
					code: courseClassListCode,
			  }
			: undefined,
		skip: !courseClassListCode,
	});

	const courseClassLists = (courseEdition || undefined)?.courseClassLists;
	const courseClassListsDropdownOptions: IDropdownOption[] = React.useMemo(
		() => (courseClassLists ? courseClassLists.map((e) => ({ key: e.id, text: e.name || "" })) : []),
		[courseClassLists]
	);

	const showEditionDropdown = editionsDropdownOptions.length > 1;
	const showCourseClassListDropdown = courseClassListsDropdownOptions.length > 1;

	const classNames = getClassNames(styles, { theme, showCourseClassListDropdown });

	const handleCourseClassListChange = React.useCallback<Required<IDropdownProps>["onChange"]>(
		(_, option) => {
			if (!option) return;

			const courseClassList = courseClassLists?.find((i) => i.id === option.key);

			if (!courseClassList) return;

			history.replace(
				routeConfigMap.course.path({
					courseClassListCode: courseClassList.code,
				})
			);
		},
		[courseClassLists]
	);

	const courseClasses =
		courseClassesResponse.data?.courseClassListByCode?.__typename === "CourseClassList" &&
		courseClassesResponse.data.courseClassListByCode.classes;

	const listGetKey = React.useCallback((c: CourseClassItemCourseClassFragment) => c.id, []);

	const listRenderCell = React.useCallback<Required<IListProps<CourseClassItemCourseClassFragment>>["onRenderCell"]>(
		(item, index) =>
			item && (
				<>
					<CourseClassItem courseClass={item} />

					{(index || 0) < ((courseClasses || undefined)?.length || 0) - 1 && (
						<Separator styles={classNames.subComponentStyles.itemSeparator} />
					)}
				</>
			),
		[classNames.subComponentStyles.itemSeparator, courseClasses && courseClasses.length]
	);

	return (
		<div className={classNames.root} data-is-scrollable>
			{courseEditionsResponse.loading ? (
				<Spinner styles={classNames.subComponentStyles.editionsSpinner} size={SpinnerSize.large} />
			) : (
				<>
					{(showEditionDropdown || showCourseClassListDropdown) && (
						<>
							<div className={classNames.dropdownsContainer}>
								{showEditionDropdown && (
									<Dropdown
										styles={classNames.subComponentStyles.editionDropdown}
										selectedKey={courseEdition?.id}
										options={editionsDropdownOptions}
										responsiveMode={ResponsiveMode.large}
										onChange={handleCourseEditionChange}
									/>
								)}

								{showCourseClassListDropdown && (
									<Dropdown
										selectedKey={courseClassListId}
										options={courseClassListsDropdownOptions}
										responsiveMode={ResponsiveMode.large}
										onChange={handleCourseClassListChange}
									/>
								)}
							</div>

							<Separator />
						</>
					)}

					{courseClassesResponse.loading ? (
						<Spinner size={SpinnerSize.large} />
					) : (
						<>
							{courseClasses && (
								<FocusZone direction={FocusZoneDirection.vertical}>
									<List<CourseClassItemCourseClassFragment>
										items={courseClasses}
										getKey={listGetKey}
										onRenderCell={listRenderCell}
									/>
								</FocusZone>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};
