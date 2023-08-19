import { FontIcon, Link, Stack, Text } from "@fluentui/react"
import React from "react"

import { RADIO_OUTLINE_ICON_NAME } from "../../../../../components/Icon/radio-outline.generated"
import { useCourseSelectionStore } from "../../../../../courseSelection"
import { useLocalLinkProps } from "../../../../../hooks/useLocalLinkProps"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { courseRouteConfig } from "../../course.route.config"
import type { CourseClassItemCourseClassFragment } from "./CourseClassItem.urqlGraphql.generated"
import { useCourseClassItemStyles } from "./useCourseClassItemStyles"

export type CourseClassItemProps = {
	children?: undefined
	className?: string
	courseClass: CourseClassItemCourseClassFragment
}

const CourseClassItemComponent: React.FC<CourseClassItemProps> = ({ className, courseClass }) => {
	const { number: courseClassNumber, courseClassList } = courseClass
	const { code: courseClassListCode } = courseClassList ?? {}

	const url = React.useMemo(() => {
		if (!courseClassListCode || !courseClassNumber) {
			return ""
		}

		return courseRouteConfig.path({
			code: courseClassListCode,
			courseClassNumber: courseClassNumber,
		})
	}, [courseClassListCode, courseClassNumber])

	const selectedCourseClassId = useObservableStates(useCourseSelectionStore(), ["selection"]).selection.courseClassId
	const active = courseClass.id === selectedCourseClassId

	const styles = useCourseClassItemStyles({
		className,
		active,
	})

	return (
		<Link className={styles.wrapper} {...useLocalLinkProps({ href: url })}>
			<Stack className={styles.content} disableShrink>
				<Text className={styles.courseClassNumber}>{courseClassNumber}</Text>

				{courseClass.liveState?.inProgress && (
					<FontIcon title="Emitiendo" iconName={RADIO_OUTLINE_ICON_NAME} className={styles.liveIndicator} />
				)}

				<Stack.Item shrink={1}>
					<Text className={styles.courseClassName}>{courseClass.name}</Text>
				</Stack.Item>
			</Stack>
		</Link>
	)
}

export const CourseClassItem = React.memo(CourseClassItemComponent)
