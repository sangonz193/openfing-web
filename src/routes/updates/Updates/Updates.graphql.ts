import gql from "graphql-tag";

import { UpdateItemCourseClassFragmentDoc } from "./UpdateItem/UpdateItem.graphql";

export const updates = gql`
	query updates {
		latestCourseClasses {
			...UpdateItemCourseClass
		}
	}

	${UpdateItemCourseClassFragmentDoc}
`;
