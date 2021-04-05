import gql from "graphql-tag"

import { FaqItemFragmentDoc } from "../FaqItem/FaqItem.graphql"

export const faqs = gql`
	query faqs {
		faqs {
			...FaqItemFaq
		}
	}

	${FaqItemFragmentDoc}
`
