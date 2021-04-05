import { CommandBar, Image, ImageFit, Separator, Spinner, SpinnerSize, Stack, Text } from "@fluentui/react";
import React from "react";

import { CreativeCommonsFooter } from "../../../../../components/CreativeCommonsFooter";
import { useReactiveVars } from "../../../../../hooks/useReactiveVars";
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer";
import { useCourseSelectionStore } from "../../../../../modules/CourseSelection";
import { CourseClassDownloadButton } from "../CourseClassDownloadButton";
import { CourseClassPlayer } from "../CourseClassPlayer";
import { CourseClassShareButton } from "../CourseClassShareButton";
import { useCourseClassByIdQuery, useCourseClassListByIdQuery } from "./CourseDetail.graphql.generated";
import { useCourseDetailStyles } from "./useCourseDetailStyles";

export type CourseDetailProps = {
	children?: undefined;
	className?: string;
};

const CourseDetailComponent: React.FC<CourseDetailProps> = ({ className }) => {
	const styles = useCourseDetailStyles({
		className,
	});
	const courseClassPlayerStore = useCourseClassPlayerStore();

	const { htmlVideoElement } = useReactiveVars(courseClassPlayerStore, ["htmlVideoElement"]);
	const { selection } = useReactiveVars(useCourseSelectionStore(), ["selection"]);

	const courseClassQueryVariables = selection.courseClassId
		? {
				id: selection.courseClassId,
		  }
		: undefined;
	const courseClassResult = useCourseClassByIdQuery({
		variables: courseClassQueryVariables,
		skip: !courseClassQueryVariables,
	});

	const courseClassListResult = useCourseClassListByIdQuery({
		variables: selection.courseClassListId
			? {
					id: selection.courseClassListId,
			  }
			: undefined,
		skip: !selection.courseClassListId,
	});

	const courseClass =
		courseClassResult.data?.courseClassById?.__typename === "CourseClass"
			? courseClassResult.data?.courseClassById
			: undefined;

	React.useEffect(() => {
		if (htmlVideoElement && courseClass?.chapterCues) {
			const handler = () => {
				courseClassPlayerStore.setChapterTextTracks(
					courseClass.chapterCues.map((chapterCue) => {
						const vvtCue = new VTTCue(chapterCue.startSeconds, chapterCue.endSeconds, chapterCue.name);
						vvtCue.id = chapterCue.id;

						return vvtCue;
					})
				);
			};

			htmlVideoElement.addEventListener("loadedmetadata", handler);

			return () => htmlVideoElement.removeEventListener("loadedmetadata", handler);
		}

		return undefined;
	}, [htmlVideoElement, courseClass?.chapterCues]);

	const publishedAt = React.useMemo(
		() => (courseClass?.publishedAt ? new Date(courseClass.publishedAt) : undefined),
		[courseClass?.publishedAt]
	);
	const publishedAtText = React.useMemo(
		() =>
			publishedAt &&
			`Publicado el ${publishedAt.getDate().toString().padStart(2, "0")} de ${new Intl.DateTimeFormat("es-UY", {
				month: "long",
			})
				.format(publishedAt)
				.toLowerCase()} de ${publishedAt.getFullYear()}`,
		[publishedAt]
	);

	const course =
		courseClassListResult.data?.courseClassListById?.__typename === "CourseClassList"
			? courseClassListResult.data?.courseClassListById.courseEdition?.course
			: undefined;

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
								{courseClass?.videos && courseClass?.videos.length > 0 && (
									<CourseClassPlayer courseClassVideo={courseClass.videos[0]} />
								)}

								<Text className={styles.courseClassName} variant="xLargePlus">
									{courseClass.name}
								</Text>

								<Text className={styles.courseClassDate}>{publishedAtText}</Text>

								<Separator className={styles.separator} />

								<CommandBar
									items={[
										{ key: "download", commandBarButtonAs: CourseClassDownloadButton },
										{ key: "share", commandBarButtonAs: CourseClassShareButton },
									]}
									className={styles.commandBar}
								/>
							</>
						)}
					</>
				)}
			</Stack.Item>

			<Stack.Item disableShrink>
				<CreativeCommonsFooter />
			</Stack.Item>
		</Stack>
	);
};

export const CourseDetail = React.memo(CourseDetailComponent);
