import { gql } from "@apollo/client";

// Remember there's no way to handle errors from here
export const courseClassListByCodeWithId_CourseSelection = gql`
	query courseClassListByCodeWithId_CourseSelection($code: String!) {
		courseClassListByCode(code: $code) {
			... on CourseClassList {
				id
				code
			}
		}
	}
`;

export const courseClassListByCodeWithClasses_CourseSelection = gql`
	query courseClassListByCodeWithClasses_CourseSelection($code: String!) {
		courseClassListByCode(code: $code) {
			... on CourseClassList {
				id
				code

				classes {
					id
					number
				}
			}
		}
	}
`;
