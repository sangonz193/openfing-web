import gql from "graphql-tag"

import { FaqItemFragmentDoc } from "../FaqItem/FaqItem.urqlGraphql"

export const FaqsDocument = gql`
	query faqs {
		faqs {
			...FaqItemFaq
		}
	}
	${FaqItemFragmentDoc}
`
