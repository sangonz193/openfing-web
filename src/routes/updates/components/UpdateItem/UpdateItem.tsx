import { FontIcon, Image, ImageFit, Link, Stack, Text } from "@fluentui/react"
import React from "react"

import { RADIO_OUTLINE_ICON_NAME } from "../../../../components/Icon/radio-outline.generated"
import { getCourseClassShortDateInfo } from "../../../../graphql/CourseClass/getCourseClassShortDateInfo"
import { useLocalLinkProps } from "../../../../hooks/useLocalLinkProps"
import { courseRouteConfig } from "../../../courses/course/course.route.config"
import type { UpdateItemCourseClassFragment } from "./UpdateItem.urqlGraphql.generated"
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

	const date = React.useMemo(() => {
		if (courseClass.liveState?.startDate) {
			return (
				<div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "auto" }}>
					{courseClass.liveState.inProgress && (
						<FontIcon
							title="Emitiendo"
							iconName={RADIO_OUTLINE_ICON_NAME}
							className={styles.liveIndicatorIcon}
						/>
					)}

					<Text>{getCourseClassShortDateInfo(courseClass)}</Text>
				</div>
			)
		} else if (courseClass.publishedAt) {
			const dateTimeFormatter = new Intl.DateTimeFormat("es-UY", {
				day: "numeric",
				month: "numeric",
			})
			return dateTimeFormatter.format(Date.parse(courseClass.publishedAt))
		}

		return null
	}, [courseClass.publishedAt, courseClass.liveState])

	return (
		<Stack className={styles.wrapper}>
			<Link className={styles.contentWrapper} {...useLocalLinkProps({ href: url })}>
				<Stack className={styles.iconContainer}>
					{course?.iconUrl && (
						<Image className={styles.image} src={course?.iconUrl} imageFit={ImageFit.contain} />
					)}
				</Stack>

				<Stack className={styles.infoContainer}>
					<Text className={styles.courseName}>{course?.name}</Text>

					<Text variant="large">{name}</Text>

					{date && <Text className={styles.dateInfo}>{date}</Text>}
				</Stack>
			</Link>
		</Stack>
	)
}

export const UpdateItem = React.memo(UpdateItemComponent)
