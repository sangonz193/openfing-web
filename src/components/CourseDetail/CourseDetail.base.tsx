import { CommandBar } from "@fluentui/react/lib/CommandBar";
import { Image, ImageFit } from "@fluentui/react/lib/Image";
import { Separator } from "@fluentui/react/lib/Separator";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { Stack } from "@fluentui/react/lib/Stack";
import { Text } from "@fluentui/react/lib/Text";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import { useReactiveVars } from "../../hooks/useReactiveVars";
import { useCourseClassPlayerStore } from "../../modules/CourseClassPlayer";
import { useCourseSelectionStore } from "../../modules/CourseSelection";
import { CourseClassDownloadButton } from "../CourseClassDownloadButton";
import { CourseClassPlayer } from "../CourseClassPlayer";
import { CourseClassShareButton } from "../CourseClassShareButton";
import { CreativeCommonsFooter } from "../CreativeCommonsFooter";
import { useCourseClassByIdQuery, useCourseClassListByIdQuery } from "./CourseDetail.graphql.generated";
import { CourseDetailProps, CourseDetailStyleProps, CourseDetailStyles } from "./CourseDetail.types";

const getClassNames = classNamesFunction<CourseDetailStyleProps, CourseDetailStyles>();

export const CourseDetailBase = (props: CourseDetailProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme });

	const courseClassPlayerStore = useCourseClassPlayerStore();

	const { htmlVideoElement } = useReactiveVars(courseClassPlayerStore, ["htmlVideoElement"]);
	const { selection } = useReactiveVars(useCourseSelectionStore(), ["selection"]);

	const courseClassResult = useCourseClassByIdQuery({
		variables: selection.courseClassId
			? {
					id: selection.courseClassId,
			  }
			: undefined,
		skip: !selection.courseClassId,
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
		<Stack className={classNames.root} data-is-scrollable>
			<Stack.Item className={classNames.container} disableShrink>
				{courseClassResult.loading ? (
					<Spinner size={SpinnerSize.large} styles={classNames.subComponentStyles.spinner} />
				) : (
					<>
						{!courseClass && course?.iconUrl && (
							<Image
								styles={classNames.subComponentStyles.courseIcon}
								src={course?.iconUrl}
								imageFit={ImageFit.contain}
							/>
						)}

						{courseClass && (
							<>
								{courseClass?.videos && courseClass?.videos.length > 0 && (
									<CourseClassPlayer courseClassVideo={courseClass.videos[0]} />
								)}

								<Text styles={classNames.subComponentStyles.courseClassName} variant="xLargePlus">
									{courseClass.name}
								</Text>

								<Text styles={classNames.subComponentStyles.courseClassDate}>{publishedAtText}</Text>

								<Separator styles={classNames.subComponentStyles.separator} />

								<CommandBar
									items={[
										{ key: "download", commandBarButtonAs: CourseClassDownloadButton },
										{ key: "share", commandBarButtonAs: CourseClassShareButton },
									]}
									styles={classNames.subComponentStyles.commandBar}
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
