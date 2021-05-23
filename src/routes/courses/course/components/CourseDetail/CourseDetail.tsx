import type { ICommandBarItemProps } from "@fluentui/react"
import { CommandBar, Image, ImageFit, Separator, Spinner, SpinnerSize, Stack, Text } from "@fluentui/react"
import parse from "html-react-parser"
import React from "react"
import { useResizeDetector } from "react-resize-detector"

import { hasProperty } from "../../../../../_utils/hasProperty"
import { CreativeCommonsFooter } from "../../../../../components/CreativeCommonsFooter"
import { getCourseClassDateInfo } from "../../../../../graphql/CourseClass/getCourseClassDateInfo"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useCourseSelectionStore } from "../../../../../modules/CourseSelection"
import { CourseClassDownloadButton } from "../CourseClassDownloadButton"
import { CourseClassPlayer } from "../CourseClassPlayer"
import { CourseClassShareButton } from "../CourseClassShareButton"
import { useCourseClassByIdQuery, useCourseClassListByIdQuery } from "./CourseDetail.graphql.generated"
import { useCourseDetailStyles } from "./useCourseDetailStyles"

export type CourseDetailProps = {
	children?: undefined
	className?: string
}

const CourseDetailComponent: React.FC<CourseDetailProps> = ({ className }) => {
	const styles = useCourseDetailStyles({
		className,
	})
	const courseClassPlayerStore = useCourseClassPlayerStore()

	const { htmlVideoElement } = useReactiveVars(courseClassPlayerStore, ["htmlVideoElement"])
	const { selection } = useReactiveVars(useCourseSelectionStore(), ["selection"])

	const courseClassQueryVariables = selection.courseClassId
		? {
				id: selection.courseClassId,
		  }
		: undefined
	const courseClassResult = useCourseClassByIdQuery({
		variables: courseClassQueryVariables,
		skip: !courseClassQueryVariables,
	})

	const courseClassListResult = useCourseClassListByIdQuery({
		variables: selection.courseClassListId
			? {
					id: selection.courseClassListId,
			  }
			: undefined,
		skip: !selection.courseClassListId,
	})

	const courseClass =
		courseClassResult.data?.courseClassById?.__typename === "CourseClass"
			? courseClassResult.data?.courseClassById
			: undefined

	React.useEffect(() => {
		if (htmlVideoElement && courseClass?.chapterCues) {
			const handler = () => {
				courseClassPlayerStore.setChapterTextTracks(
					courseClass.chapterCues.map((chapterCue) => {
						const vvtCue = new VTTCue(chapterCue.startSeconds, chapterCue.endSeconds, chapterCue.name)
						vvtCue.id = chapterCue.id

						return vvtCue
					})
				)
			}

			htmlVideoElement.addEventListener("loadedmetadata", handler)

			return () => htmlVideoElement.removeEventListener("loadedmetadata", handler)
		}

		return undefined
	}, [htmlVideoElement, courseClass?.chapterCues])

	const dateText = React.useMemo(() => {
		return courseClass && getCourseClassDateInfo(courseClass)
	}, [courseClass])

	const [height, setHeight] = React.useState(0)
	const handleResize = React.useCallback<(width?: number) => void>((width) => {
		setHeight((9 * (width ?? 0)) / 16)
	}, [])

	const resizeDetectorTargetRef = React.useRef<HTMLDivElement>(null)
	useResizeDetector({
		targetRef: resizeDetectorTargetRef,
		handleWidth: true,
		onResize: handleResize,
	})

	React.useLayoutEffect(() => {
		if (height !== 0 || !resizeDetectorTargetRef.current) {
			return
		}

		handleResize(resizeDetectorTargetRef.current.getBoundingClientRect().width)
	})

	const course =
		courseClassListResult.data?.courseClassListById?.__typename === "CourseClassList"
			? courseClassListResult.data?.courseClassListById.courseEdition?.course
			: undefined

	const commandBarItems = React.useMemo(() => {
		const result: ICommandBarItemProps[] = []

		if (!!courseClass?.videos.length) {
			result.push({ key: "download", commandBarButtonAs: CourseClassDownloadButton })
		}

		result.push({ key: "share", commandBarButtonAs: CourseClassShareButton })

		return result
	}, [courseClass])

	return (
		<Stack className={styles.wrapper} data-is-scrollable>
			<Stack.Item className={styles.container} disableShrink>
				{courseClassResult.loading ? (
					<Spinner size={SpinnerSize.large} className={styles.spinner} />
				) : (
					<>
						{!courseClass && course?.iconUrl && (
							<Image className={styles.courseIcon} src={course?.iconUrl} imageFit={ImageFit.contain} />
						)}

						{courseClass && (
							<>
								{courseClass.liveState?.html ? (
									<div
										ref={resizeDetectorTargetRef}
										style={{
											display: "flex",
											flexDirection: "column",
											height: height || undefined,
											maxHeight: "70vh",
										}}
									>
										{parse(courseClass.liveState.html, {
											replace: (domNode) => {
												if (
													hasProperty(domNode, "tagName") &&
													domNode.tagName === "iframe" &&
													domNode.attribs
												) {
													delete domNode.attribs.width
													domNode.attribs.height = "100%"
												}
											},
										})}
									</div>
								) : (
									courseClass?.videos &&
									courseClass?.videos.length > 0 && (
										<CourseClassPlayer courseClassVideo={courseClass.videos[0]} />
									)
								)}

								<Text className={styles.courseClassName} variant="xLargePlus">
									{courseClass.name}
								</Text>

								<Text className={styles.courseClassDate}>{dateText}</Text>

								<Separator className={styles.separator} />

								<CommandBar items={commandBarItems} className={styles.commandBar} />
							</>
						)}
					</>
				)}
			</Stack.Item>

			<Stack.Item disableShrink>
				<CreativeCommonsFooter />
			</Stack.Item>
		</Stack>
	)
}

export const CourseDetail = React.memo(CourseDetailComponent)
