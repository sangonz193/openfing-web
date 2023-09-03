import { Image, ImageFit, Stack, Text } from "@fluentui/react"
import React from "react"
import { Link } from "react-router-dom"

import { getCoursePath } from "../../course/course.route.config"
import type { CourseItemCourseFragment } from "./CourseItem.urqlGraphql.generated"
import { useCourseItemStyles } from "./useCourseItemStyles"

export type CourseItemProps = {
	children?: undefined
	className?: string
	course: CourseItemCourseFragment
}

const CourseItemComponent: React.FC<CourseItemProps> = ({ className, course }) => {
	const styles = useCourseItemStyles({
		className,
	})

	const courseClassListCode = course.editions[0]?.courseClassLists[0]?.code ?? course.code
	const url = React.useMemo(() => getCoursePath({ code: courseClassListCode }), [courseClassListCode])
	const latestEdition = course.editions.length
		? course.editions.reduce((e1, e2) => (e1.year && e2.year && e1.year > e2.year ? e1 : e2))
		: undefined

	return (
		<Link className={styles.wrapper} to={url}>
			<Stack className={styles.imageContainer}>
				{course?.iconUrl && (
					<Image className={styles.image} src={course?.iconUrl} imageFit={ImageFit.contain} />
				)}
			</Stack>

			<Stack className={styles.infoContainer}>
				<Text variant="large">{course.name}</Text>

				<Text className={styles.year}>{latestEdition?.year}</Text>
			</Stack>
		</Link>
	)
}

export const CourseItem = React.memo(CourseItemComponent)
