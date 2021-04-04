import { Image, ImageFit, Link, Text } from "@fluentui/react"
import React from "react"

import { Div } from "../../../../components/Div"
import { useLocalLinkProps } from "../../../../hooks/useLocalLinkProps"
import { courseRouteConfig } from "../../../courses/course/course.route.config"
import { UpdateItemCourseClassFragment } from "./UpdateItem.graphql.generated"
import { useUpdateItemStyles } from "./useUpdateItemStyles"

export type UpdateItemProps = {
	children?: undefined
	className?: string
	courseClass: UpdateItemCourseClassFragment
}

const UpdateItemComponent: React.FC<UpdateItemProps> = ({ className, courseClass }) => {
	const styles = useUpdateItemStyles({
		className,
	})

	const { courseClassList } = courseClass
	const course = courseClassList?.courseEdition?.course

	const url = React.useMemo(
		() =>
			courseClass.number && courseClassList?.code
				? courseRouteConfig.path({
						code: courseClassList.code,
						courseClassNumber: courseClass.number,
				  })
				: "",
		[courseClassList?.code, courseClass.number]
	)

	const name = React.useMemo(() => {
		if (!courseClass.name) {
			return ""
		}

		if (!courseClass.number) {
			return courseClass.name
		}

		return `${courseClass.number} - ${courseClass.name}`
	}, [courseClass.number, courseClass.name])

	const publishedAt = React.useMemo(
		() =>
			(courseClass.publishedAt &&
				new Intl.DateTimeFormat("es-UY", {
					day: "numeric",
					month: "numeric",
				}).format(new Date(courseClass.publishedAt))) ||
			null,
		[courseClass.publishedAt]
	)

	return (
		<Div className={styles.wrapper}>
			<Link className={styles.contentWrapper} {...useLocalLinkProps({ href: url })}>
				<Div className={styles.iconContainer}>
					{course?.iconUrl && (
						<Image className={styles.image} src={course?.iconUrl} imageFit={ImageFit.contain} />
					)}
				</Div>

				<Div className={styles.infoContainer}>
					<Text className={styles.courseName}>{course?.name}</Text>

					<Text variant="large">{name}</Text>

					{publishedAt && <Text className={styles.publishedAt}>{publishedAt}</Text>}
				</Div>
			</Link>
		</Div>
	)
}

export const UpdateItem = React.memo(UpdateItemComponent)
