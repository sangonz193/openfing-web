import type { IDropdownOption, IDropdownProps, IListProps } from "@fluentui/react"
import {
	Dropdown,
	FocusZone,
	FocusZoneDirection,
	List,
	ResponsiveMode,
	Separator,
	Spinner,
	SpinnerSize,
} from "@fluentui/react"
import React from "react"

import { Div } from "../../../../../components/Div"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useCourseSelectionStore } from "../../../../../modules/CourseSelection"
import { useHistory } from "../../../../../modules/Navigation/useHistory"
import { courseRouteConfig } from "../../course.route.config"
import { CourseClassItem } from "../CourseClassItem"
import type { CourseClassItemCourseClassFragment } from "../CourseClassItem/CourseClassItem.graphql.generated"
import { useCourseClassListByCodeQuery, useCourseClassListClassesByCodeQuery } from "./CourseMaster.graphql.generated"
import { useCourseMasterStyles } from "./useCourseMasterStyles"

export type CourseMasterProps = {
	children?: undefined
	className?: string
}

const CourseMasterComponent: React.FC<CourseMasterProps> = ({ className }) => {
	const history = useHistory()
	const { courseClassListCode, courseClassListId } = useReactiveVars(useCourseSelectionStore(), [
		"selection",
	]).selection

	const courseEditionsResponse = useCourseClassListByCodeQuery({
		variables: courseClassListCode
			? {
					code: courseClassListCode,
			  }
			: undefined,
		skip: !courseClassListCode,
	})

	const courseEditions =
		courseEditionsResponse.data?.courseClassListByCode?.__typename === "CourseClassList"
			? courseEditionsResponse.data?.courseClassListByCode?.courseEdition?.course?.editions
			: undefined
	const editionsDropdownOptions: IDropdownOption[] = React.useMemo(
		() => (courseEditions ? courseEditions.map((e) => ({ key: e.id, text: e.name || "" })) : []),
		[courseEditions]
	)

	const _courseEdition =
		courseEditionsResponse.data?.courseClassListByCode?.__typename === "CourseClassList"
			? courseEditionsResponse.data?.courseClassListByCode.courseEdition
			: undefined
	const courseEdition = _courseEdition && courseEditions && courseEditions.find((c) => c.id === _courseEdition.id)

	const handleCourseEditionChange = React.useCallback<Required<IDropdownProps>["onChange"]>(
		(_, option) => {
			if (!option) {
				return
			}

			const courseEdition = (courseEditions || undefined)?.find((ce) => ce.id === option.key)
			const courseClassList = courseEdition?.courseClassLists?.length && courseEdition.courseClassLists[0]

			if (!courseClassList) {
				return
			}

			history.replace(
				courseRouteConfig.path({
					code: courseClassList.code,
				})
			)
		},
		[courseEditions]
	)

	const courseClassesResponse = useCourseClassListClassesByCodeQuery({
		variables: courseClassListCode
			? {
					code: courseClassListCode,
			  }
			: undefined,
		skip: !courseClassListCode,
	})

	const courseClassLists = (courseEdition || undefined)?.courseClassLists
	const courseClassListsDropdownOptions: IDropdownOption[] = React.useMemo(
		() => (courseClassLists ? courseClassLists.map((e) => ({ key: e.id, text: e.name || "" })) : []),
		[courseClassLists]
	)

	const showEditionDropdown = editionsDropdownOptions.length > 1
	const showCourseClassListDropdown = courseClassListsDropdownOptions.length > 1

	const handleCourseClassListChange = React.useCallback<Required<IDropdownProps>["onChange"]>(
		(_, option) => {
			if (!option) {
				return
			}

			const courseClassList = courseClassLists?.find((i) => i.id === option.key)

			if (!courseClassList) {
				return
			}

			history.replace(
				courseRouteConfig.path({
					code: courseClassList.code,
				})
			)
		},
		[courseClassLists]
	)

	const courseClasses =
		courseClassesResponse.data?.courseClassListByCode?.__typename === "CourseClassList" &&
		courseClassesResponse.data.courseClassListByCode.classes

	const listGetKey = React.useCallback((c: CourseClassItemCourseClassFragment) => c.id, [])

	const styles = useCourseMasterStyles({
		className,
		showCourseClassListDropdown,
	})

	const listRenderCell = React.useCallback<Required<IListProps<CourseClassItemCourseClassFragment>>["onRenderCell"]>(
		(item, index) =>
			item && (
				<>
					<CourseClassItem courseClass={item} />

					{(index || 0) < ((courseClasses || undefined)?.length || 0) - 1 && (
						<Separator className={styles.itemSeparator} />
					)}
				</>
			),
		[styles.itemSeparator, courseClasses && courseClasses.length]
	)

	return (
		<Div className={styles.wrapper} data-is-scrollable>
			{courseEditionsResponse.loading ? (
				<Spinner className={styles.editionsSpinner} size={SpinnerSize.large} />
			) : (
				<>
					{(showEditionDropdown || showCourseClassListDropdown) && (
						<>
							<div className={styles.dropdownListContainer}>
								{showEditionDropdown && (
									<Dropdown
										className={styles.editionDropdown}
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
		</Div>
	)
}

export const CourseMaster = React.memo(CourseMasterComponent)
