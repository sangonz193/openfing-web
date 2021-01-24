import { useReactiveVar } from "@apollo/client";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { CourseDetail } from "src/components/CourseDetail";
import { CourseMaster } from "src/components/CourseMaster";
import { Link } from "src/components/Link";
import { useQueryParams } from "src/hooks";
import { useDocumentTitle } from "src/hooks/useDocumentTitle";
import { useHistory } from "src/hooks/useHistory";
import { Breakpoint } from "src/style";

import { useLayoutOptions } from "../../_utils/useLayoutOptions";
import { useReactiveVars } from "../../hooks/useReactiveVars";
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
	const { pinCourseClassList } = useReactiveVars(courseClassPlayerStore, ["pinCourseClassList"]);

	const selection = useReactiveVar(useCourseSelectionStore().selection);

	const courseClassListByCodeQueryResult = useCourseClassListByCodeQuery({
		variables: selection.courseClassListCode
			? {
					code: props.courseClassListCode,
			  }
			: undefined,
		skip: !selection.courseClassListCode || !props.courseClassListCode,
	});
	const course =
		courseClassListByCodeQueryResult.data?.courseClassListByCode?.__typename === "CourseClassList"
			? courseClassListByCodeQueryResult.data?.courseClassListByCode.courseEdition?.course
			: undefined;

	const courseName = course?.name;
	useDocumentTitle(`${courseName || "Curso"} - OpenFING`);

	React.useEffect(() => {
		courseClassPlayerStore.urlHash(queryParams.t ? "#t=" + queryParams.t : history.location.hash);
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

	const showCourseDetail = (props.courseClassNo && course) || isSM;

	return (
		<div className={classNames.root}>
			{(!props.courseClassNo || pinCourseClassList) && (
				<CourseMaster key="master" styles={classNames.subComponentStyles.courseMaster} />
			)}

			{showCourseDetail && <CourseDetail key="detail" styles={classNames.subComponentStyles.courseDetails} />}
		</div>
	);
};
