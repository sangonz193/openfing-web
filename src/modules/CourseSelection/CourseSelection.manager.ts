import React from "react";

import { hasProperty } from "../../_utils/hasProperty";
import { useMatchRouteConfig } from "../../hooks/useMatchRouteConfig";
import { routeConfigMap } from "../../routeConfigMap";
import {
	CourseClassListByCodeWithId_CourseSelectionQueryVariables,
	useCourseClassListByCodeWithClasses_CourseSelectionQuery,
	useCourseClassListByCodeWithId_CourseSelectionQuery,
} from "./CourseSelection.graphql.generated";
import { useCourseSelectionStore } from "./useCourseSelectionStore";

export const CourseSelectionManager: React.FC = () => {
	const store = useCourseSelectionStore();
	const match = useMatchRouteConfig(routeConfigMap.course);

	const courseClassListCode = React.useMemo(
		() =>
			match && hasProperty(match.params, "courseClassListCode") ? match.params.courseClassListCode : undefined,
		[match]
	);
	const courseClassNumber = React.useMemo(() => {
		const courseClassNo =
			match && hasProperty(match.params, "courseClassNo") && typeof match.params.courseClassNo === "string"
				? match.params.courseClassNo
				: undefined;

		const parsedCourseClassNo = courseClassNo && Number(courseClassNo);

		return parsedCourseClassNo && !isNaN(parsedCourseClassNo) ? parsedCourseClassNo : undefined;
	}, [match]);

	const variables: CourseClassListByCodeWithId_CourseSelectionQueryVariables | undefined = courseClassListCode
		? {
				code: courseClassListCode,
		  }
		: undefined;
	const courseClassListByCodeResponse = useCourseClassListByCodeWithId_CourseSelectionQuery({
		variables,
		skip: !variables,
		fetchPolicy: "cache-only",
	});
	const courseClassListClassesByCodeResponse = useCourseClassListByCodeWithClasses_CourseSelectionQuery({
		variables,
		skip: !variables,
		fetchPolicy: "cache-only",
	});

	React.useEffect(() => {
		if (!courseClassListByCodeResponse.data || !courseClassListClassesByCodeResponse.data)
			if (courseClassListCode)
				store.setSelection(
					courseClassNumber
						? {
								courseClassListCode,
								courseClassNumber,
						  }
						: {
								courseClassListCode,
						  }
				);
			else store.setSelection({});
		else if (courseClassListByCodeResponse.data.courseClassListByCode.__typename === "CourseClassList") {
			if (courseClassListByCodeResponse.variables?.code !== courseClassListCode) return;

			const { courseClassListByCode } = courseClassListByCodeResponse.data;
			const variableCode = courseClassListByCodeResponse.variables?.code;
			const courseClass =
				typeof courseClassNumber === "number" &&
				courseClassListClassesByCodeResponse.data.courseClassListByCode.__typename === "CourseClassList" &&
				Array.isArray(courseClassListClassesByCodeResponse.data.courseClassListByCode.classes)
					? courseClassListClassesByCodeResponse.data.courseClassListByCode.classes.find(
							(c) => c.number === courseClassNumber
					  )
					: undefined;

			store.setSelection({
				courseClassListCode: variableCode,
				courseClassListId: courseClassListByCode.id,
				...(courseClass
					? { courseClassId: courseClass.id, courseClassNumber: courseClass.number || undefined }
					: {}),
			});
		}
	}, [
		courseClassListByCodeResponse.data,
		courseClassListClassesByCodeResponse.data,
		courseClassListCode,
		courseClassNumber,
	]);

	return null;
};
