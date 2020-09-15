import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { CourseDetail } from "src/components/CourseDetail";
import { CourseMaster } from "src/components/CourseMaster";
import { Link } from "src/components/Link";
import { useQueryParams } from "src/hooks";
import { useDocumentTitle } from "src/hooks/useDocumentTitle";
import { useHistory } from "src/hooks/useHistory";
import { useObserveProperties } from "src/hooks/useObserveProperties";
import { Breakpoint } from "src/style";

import { useLayoutOptions } from "../../_utils/useLayoutOptions";
import { useCourseClassPlayerStore } from "../../modules/CourseClassPlayer";
import { useCourseSelectionStore } from "../../modules/CourseSelection";
import { useCourseClassListByCodeQuery } from "./Course.graphql.generated";
import { CourseProps, CourseStyleProps, CourseStyles } from "./Course.types";

const getClassNames = classNamesFunction<CourseStyleProps, CourseStyles>();

type CourseQueryParams = "t";

export const CourseBase = (props: CourseProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className });

	const history = useHistory();
	const queryParams = useQueryParams<CourseQueryParams>();
	const courseClassPlayerStore = useCourseClassPlayerStore();

	const selection = useObserveProperties(useObserveProperties(useCourseSelectionStore(), ["selection"]).selection, [
		"courseClassListCode",
	]);
	const courseClassListByCodeQueryResult = useCourseClassListByCodeQuery({
		variables: selection.courseClassListCode
			? {
					code: props.courseClassListCode,
			  }
			: undefined,
		skip: !props.courseClassListCode,
	});
	const course =
		courseClassListByCodeQueryResult.data?.courseClassListByCode?.__typename === "CourseClassList"
			? courseClassListByCodeQueryResult.data?.courseClassListByCode.courseEdition?.course
			: undefined;

	const courseName = course?.name;
	useDocumentTitle(`${courseName || "Curso"} - OpenFING`);

	React.useEffect(() => {
		courseClassPlayerStore.setUrlHash(queryParams.t ? "#t=" + queryParams.t : history.location.hash);
	}, [queryParams.t, history.location.hash]);

	const isSM = useMediaQuery({ minWidth: Breakpoint.sm });

	const headerTitle = !courseClassListByCodeQueryResult.loading && !course ? "Oops" : courseName ? courseName : "";
	useLayoutOptions(
		React.useCallback(
			() => ({
				header: {
					title: headerTitle,
					right: course?.eva && (
						<Link styles={classNames.subComponentStyles.headerLink} anchorProps={{ href: course.eva }}>
							EVA
						</Link>
					),
				},
			}),
			[headerTitle, course?.eva, classNames.subComponentStyles.headerLink]
		)
	);

	return (
		<div className={classNames.root}>
			<CourseMaster key="master" styles={classNames.subComponentStyles.courseMaster} />

			{((props.courseClassNo && course) || isSM) && (
				<CourseDetail key="detail" styles={classNames.subComponentStyles.courseDetails} />
			)}
		</div>
	);
};
