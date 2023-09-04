import type { IListProps } from "@fluentui/react"
import { css, FocusZone, FocusZoneDirection, List, Separator, Spinner, SpinnerSize, Stack } from "@fluentui/react"
import React from "react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/cn"

import { registerChevrondownIcon } from "../../../../../components/Icon/chevrondown"
import { useCourseSelectionStore } from "../../../../../courseSelection"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { getCoursePath } from "../../course.route.config"
import { CourseClassItem } from "../CourseClassItem"
import type { CourseClassItemCourseClassFragment } from "../CourseClassItem/CourseClassItem.urqlGraphql.generated"
import { useCourseClassListClassesByCodeQuery } from "./CourseMaster.urqlGraphql.generated"
import { useCourseClassListSelectorOptions } from "./useCourseClassListSelectorOptions"
import { useCourseMasterStyles } from "./useCourseMasterStyles"

registerChevrondownIcon()

export type CourseMasterProps = {
	children?: undefined
	className?: string
}

const CourseMasterComponent: React.FC<CourseMasterProps> = ({ className }) => {
	const { courseClassListCode, courseClassListId } = useObservableStates(useCourseSelectionStore(), [
		"selection",
	]).selection
	const allCourseClassLists = useCourseClassListSelectorOptions({
		courseClassListId: courseClassListId,
	})

	const [courseClassesResponse] = useCourseClassListClassesByCodeQuery({
		variables: courseClassListCode
			? {
					code: courseClassListCode,
			  }
			: undefined,
		pause: !courseClassListCode,
	})

	const courseClasses =
		courseClassesResponse.data?.courseClassListByCode?.__typename === "CourseClassList" &&
		courseClassesResponse.data.courseClassListByCode.classes

	const listGetKey = React.useCallback((c: CourseClassItemCourseClassFragment) => c.id, [])

	const styles = useCourseMasterStyles()

	const listRenderCell = React.useCallback<Required<IListProps<CourseClassItemCourseClassFragment>>["onRenderCell"]>(
		(item, index) =>
			item && (
				<>
					<CourseClassItem courseClass={item} className="mx-2 rounded" />

					{(index || 0) < ((courseClasses || undefined)?.length || 0) - 1 && (
						<Separator className="mx-4 mb-px py-0" />
					)}
				</>
			),
		[courseClasses && courseClasses.length]
	)

	return (
		<div
			className={cn(
				"flex shrink flex-col overflow-hidden md:mb-2 md:w-[350px] md:shrink-0 md:rounded-xl md:bg-foreground/10",
				className
			)}
		>
			<Stack className="shrink overflow-auto bg-transparent pb-10 md:py-2" data-is-scrollable disableShrink>
				{allCourseClassLists && allCourseClassLists.length > 1 && (
					<>
						<div className={styles.dropdownListContainer}>
							{allCourseClassLists.map((item) => (
								<CourseClassListOption
									key={item.id}
									className={styles.courseClassListOption}
									activeClassName={styles.activeCourseClassListOption}
									selectedListId={courseClassListId}
									{...item}
								/>
							))}
						</div>

						<Separator />
					</>
				)}

				{courseClassesResponse.fetching ? (
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
			</Stack>
		</div>
	)
}

const CourseClassListOption: React.FC<{
	id: string
	code: string
	readableText: string
	className: string
	activeClassName: string
	selectedListId: string | undefined
}> = React.memo((props) => {
	const active = props.selectedListId === props.id

	return (
		<Link
			className={css(props.className, active && props.activeClassName)}
			to={getCoursePath({ code: props.code })}
		>
			{props.readableText}
		</Link>
	)
})

export const CourseMaster = React.memo(CourseMasterComponent)
