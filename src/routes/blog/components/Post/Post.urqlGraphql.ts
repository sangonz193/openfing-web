import { gql } from "urql"

export const PostFragmentDoc = gql`
	fragment PostFragment on Post {
		id
		title
		mdContent
		publishedAt
	}
`

export const DeletePostDocument = gql`
	mutation deletePost($id: ID!) {
		deletePost(id: $id) {
			__typename
		}
	}
`
