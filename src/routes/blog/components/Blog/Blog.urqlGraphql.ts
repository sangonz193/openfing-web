import { gql } from "urql"

import { PostFragmentDoc } from "../Post/Post.urqlGraphql"

export const PostsDocument = gql`
	query posts {
		posts {
			...PostFragment
		}
	}

	${PostFragmentDoc}
`
