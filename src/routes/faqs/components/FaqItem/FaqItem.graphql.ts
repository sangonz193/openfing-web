import gql from "graphql-tag"

export const FaqItemFragmentDoc = gql`
	fragment FaqItemFaq on Faq {
		id
		title
		content
		isHtml
	}
`
