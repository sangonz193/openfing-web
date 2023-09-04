import type { ICommandBarItemProps } from "@fluentui/react"
import { CommandBarButton, Image, ImageFit, Separator, Spinner, SpinnerSize, Stack, Text } from "@fluentui/react"
import { hasProperty } from "@sangonz193/utils/hasProperty"
import parse from "html-react-parser"
import React from "react"
import { useResizeDetector } from "react-resize-detector"

import { cn } from "@/lib/cn"

import { useIsAuthenticated } from "../../../../../auth"
import { CreativeCommonsFooter } from "../../../../../components/CreativeCommonsFooter/CreativeCommonsFooter"
import { useCourseClassPlayerStore } from "../../../../../courseClassPlayer"
import { useCourseSelectionStore } from "../../../../../courseSelection"
import { getCourseClassDateInfo } from "../../../../../graphql/CourseClass/getCourseClassDateInfo"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { CourseClassDownloadButton } from "../CourseClassDownloadButton"
import { CourseClassPlayer } from "../CourseClassPlayer"
import { CourseClassShareButton } from "../CourseClassShareButton"
import type { CourseClassSyncVideosButtonProps } from "../CourseClassSyncVideosButton"
import { useCourseClassByIdQuery, useCourseClassListByIdQuery } from "./CourseDetail.urqlGraphql.generated"
import { useCourseDetailStyles } from "./useCourseDetailStyles"

const CourseClassSyncVideosButton = React.lazy(async () => ({
	default: (await import("../CourseClassSyncVideosButton")).CourseClassSyncVideosButton,
}))

const CourseClassSyncVideosButtonSuspense = (props: CourseClassSyncVideosButtonProps) => (
	<React.Suspense fallback={null}>
		<CourseClassSyncVideosButton {...props} />
	</React.Suspense>
)

export type CourseDetailProps = {
	children?: undefined
	className?: string
}

const CourseDetailComponent: React.FC<CourseDetailProps> = ({ className }) => {
	const styles = useCourseDetailStyles({
		className,
	})
	const courseClassPlayerStore = useCourseClassPlayerStore()

	const { htmlVideoElement } = useObservableStates(courseClassPlayerStore, ["htmlVideoElement"])
	const { selection } = useObservableStates(useCourseSelectionStore(), ["selection"])

	const courseClassQueryVariables = selection.courseClassId
		? {
				id: selection.courseClassId,
		  }
		: undefined
	const [courseClassResult] = useCourseClassByIdQuery({
		variables: courseClassQueryVariables,
		pause: !courseClassQueryVariables,
	})

	const [courseClassListResult] = useCourseClassListByIdQuery({
		variables: selection.courseClassListId
			? {
					id: selection.courseClassListId,
			  }
			: undefined,
		pause: !selection.courseClassListId,
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

			if (courseClassPlayerStore.loaded.getValue()) {
				handler()
				return
			}

			htmlVideoElement.addEventListener("loadedmetadata", handler)
			return () => htmlVideoElement.removeEventListener("loadedmetadata", handler)
		}

		return undefined
	}, [htmlVideoElement, courseClass?.chapterCues])

	const dateText = React.useMemo(() => {
		return courseClass && getCourseClassDateInfo(courseClass)
	}, [courseClass?.publishedAt, courseClass?.liveState?.startDate])

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
	}, [courseClass?.liveState?.html])

	const course =
		courseClassListResult.data?.courseClassListById?.__typename === "CourseClassList"
			? courseClassListResult.data?.courseClassListById.courseEdition?.course
			: undefined

	const isAuthenticated = useIsAuthenticated()
	const commandBarItems = React.useMemo(() => {
		const result: ICommandBarItemProps[] = []

		if (!!courseClass?.videos.length && !courseClass?.liveState) {
			result.push({ key: "download", commandBarButtonAs: CourseClassDownloadButton })
		}

		result.push({ key: "share", commandBarButtonAs: CourseClassShareButton })

		if (isAuthenticated) {
			result.push({ key: "sync_videos", commandBarButtonAs: CourseClassSyncVideosButtonSuspense })
		}

		return result
	}, [courseClass, isAuthenticated])

	return (
		<Stack className={cn(styles.wrapper, "md:pr-2")} data-is-scrollable>
			<Stack.Item className={styles.container} disableShrink>
				{courseClassResult.fetching ? (
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
									<CourseClassPlayer
										loadingCourseClassVideo={false}
										courseClassVideo={courseClass.videos[0] || undefined}
										liveState={!!courseClass.liveState}
									/>
								)}

								<Text className={styles.courseClassName} variant="xLargePlus">
									{courseClass.name}
								</Text>

								<Text className={styles.courseClassDate}>{dateText}</Text>

								<Separator className={styles.separator} />

								<Stack
									className={styles.commandBar}
									horizontal
									disableShrink
									tokens={{ childrenGap: 10 }}
								>
									{commandBarItems.map((props) =>
										props.commandBarButtonAs ? (
											<props.commandBarButtonAs {...props} />
										) : (
											<CommandBarButton {...(props as any)} />
										)
									)}
								</Stack>
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
