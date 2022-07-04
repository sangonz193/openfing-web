import gql from "graphql-tag"

import { UpdateItemCourseClassFragmentDoc } from "../UpdateItem/UpdateItem.urqlGraphql"

export const UpdatesDocument = gql`
	query updates {
		latestCourseClasses {
			...UpdateItemCourseClass
		}
	}

	${UpdateItemCourseClassFragmentDoc}
`
