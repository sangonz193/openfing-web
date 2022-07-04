import gql from "graphql-tag"

export const CreatePostDocument = gql`
	mutation createPost($input: CreatePostInput!) {
		createPost(input: $input) {
			__typename
			... on CreatePostPayload {
				post {
					id
					title
					mdContent
					publishedAt
				}
			}
		}
	}
`

export const UpdatePostDocument = gql`
	mutation updatePost($id: ID!, $input: UpdatePostInput!) {
		updatePost(id: $id, input: $input) {
			__typename
			... on UpdatePostPayload {
				post {
					id
					title
					mdContent
					publishedAt
				}
			}
		}
	}
`

export const PostFragmentDoc = gql`
	fragment PostFragment on Post {
		id
		title
		mdContent
		publishedAt
	}
`
