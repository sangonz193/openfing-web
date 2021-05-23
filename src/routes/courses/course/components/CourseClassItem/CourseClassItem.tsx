import { Link, Text } from "@fluentui/react"
import React from "react"

import { Div } from "../../../../../components/Div"
import { useLocalLinkProps } from "../../../../../hooks/useLocalLinkProps"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useCourseSelectionStore } from "../../../../../modules/CourseSelection"
import { courseRouteConfig } from "../../course.route.config"
import type { CourseClassItemCourseClassFragment } from "./CourseClassItem.graphql.generated"
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

	const selectedCourseClassId = useReactiveVars(useCourseSelectionStore(), ["selection"]).selection.courseClassId
	const active = courseClass.id === selectedCourseClassId

	const styles = useCourseClassItemStyles({
		className,
		active,
	})

	return (
		<Link className={styles.wrapper} {...useLocalLinkProps({ href: url })}>
			<Div className={styles.content}>
				<Text className={styles.courseClassNumber}>{courseClassNumber}</Text>

				<span> </span>

				<Text className={styles.courseClassName}>{courseClass.name}</Text>
			</Div>
		</Link>
	)
}

export const CourseClassItem = React.memo(CourseClassItemComponent)
