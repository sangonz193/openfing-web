import { FocusZone, FocusZoneDirection } from "@fluentui/react/lib/FocusZone";
import { List } from "@fluentui/react/lib/List";
import { SearchBox } from "@fluentui/react/lib/SearchBox";
import { Separator } from "@fluentui/react/lib/Separator";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";
import { CourseItem } from "src/components/CourseItem";
import { CreativeCommonsFooter } from "src/components/CreativeCommonsFooter";
import { useDocumentTitle } from "src/hooks/useDocumentTitle";

import { useLayoutOptions } from "../../_utils/useLayoutOptions";
import { useComponent } from "../../hooks/useComponent";
import { useObserveProperties } from "../../hooks/useObserveProperties";
import { useCourseSearchStore } from "../../modules/CourseSearch";
import { useCoursesQuery } from "./Courses.graphql.generated";
import { CoursesProps, CoursesStyleProps, CoursesStyles } from "./Courses.types";

const getClassNames = classNamesFunction<CoursesStyleProps, CoursesStyles>();

export const CoursesBase = (props: CoursesProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className });

	useDocumentTitle("Cursos - OpenFING");

	const coursesResponse = useCoursesQuery();
	const courses = coursesResponse.data?.courses || [];

	const [courseSearch, setCourseSearch] = React.useState("");

	const courseSearchStore = useCourseSearchStore();
	const { searchResults } = useObserveProperties(courseSearchStore, ["searchResults"]);

	React.useEffect(() => {
		courseSearchStore.setSource(courses);
	}, [coursesResponse.data?.courses]);

	const CourseSearchBox = useComponent(
		(props) => {
			const { courseSearch, classNames } = props;

			return (
				<SearchBox
					className={classNames.searchField}
					placeholder="Buscar"
					value={courseSearch}
					onChange={(_, v) => setCourseSearch(v || "")}
					clearButtonProps={{
						iconProps: {
							iconName: "Clear",
							styles: classNames.subComponentStyles.searchBoxClearButtonIcon,
						},
					}}
				/>
			);
		},
		{ courseSearch, classNames }
	);

	useLayoutOptions(
		React.useCallback(
			() => ({
				header: {
					title: <CourseSearchBox />,
				},
			}),
			[]
		)
	);

	React.useEffect(() => {
		let canceled = false;

		(async () => {
			await new Promise((r) => setTimeout(r, 300));
			if (canceled) return;

			courseSearchStore.setSearchValue(courseSearch);
		})();

		return () => {
			canceled = true;
		};
	}, [courses, courseSearch]);

	const getKey = React.useCallback((user: { id: string }) => user.id, []);
	const handleRenderCell = React.useCallback(
		(item?: typeof courses[0], index?: number) => {
			return item && typeof index === "number" ? (
				<>
					<CourseItem course={item} />

					{index + 1 !== courses?.length && <Separator styles={classNames.subComponentStyles.searchBox} />}
				</>
			) : null;
		},
		[courses, classNames.subComponentStyles.searchBox]
	);

	const filteredCourses = React.useMemo(() => {
		const map = new Map<string, typeof courses[number]>();

		courses.forEach((course) => {
			map.set(course.id, course);
		});

		return searchResults.reduce<typeof courses>((res, searchResult) => {
			const fromMap = map.get(searchResult.id);

			if (fromMap) res.push(fromMap);

			return res;
		}, []);
	}, [searchResults]);

	return (
		<div className={classNames.root} data-is-scrollable>
			<FocusZone direction={FocusZoneDirection.vertical} className={classNames.content}>
				{coursesResponse.loading ? (
					<Spinner size={SpinnerSize.large} styles={classNames.subComponentStyles.spinner} />
				) : (
					<List
						items={filteredCourses}
						ignoreScrollingState
						getKey={getKey}
						onRenderCell={handleRenderCell}
					/>
				)}
			</FocusZone>

			<CreativeCommonsFooter />
		</div>
	);
};
