import { Loader2 as Loader2Icon } from "lucide-react"
import { Fragment } from "react"
import { useQuery } from "urql"

import { CreativeCommonsFooter } from "@/components/creative-commons-footer"
import { graphql } from "@/gql"

import { FaqItem } from "./faq-item"

export const FaqsQueryDocument = graphql(/* GraphQL */ `
	query FaqsQuery {
		faqsCollection(orderBy: [{ position: AscNullsLast }]) {
			edges {
				node {
					id
					...FaqItemFragment
				}
			}
		}
	}
`)

export function Faqs() {
	const [{ fetching, data }] = useQuery({ query: FaqsQueryDocument })

	return (
		<div className="flex shrink grow flex-col overflow-auto">
			<div className="mx-auto grid min-h-full w-full max-w-4xl shrink-0 gap-8 p-4 pb-10 md:grid-cols-2">
				{fetching ? (
					<Loader2Icon className="col-span-full mx-auto mt-4 h-10 w-10 animate-spin text-primary" />
				) : (
					data?.faqsCollection?.edges.map(({ node }) => (
						<Fragment key={node.id}>
							<FaqItem faqFragment={node} />
						</Fragment>
					))
				)}
			</div>

			<CreativeCommonsFooter />
		</div>
	)
}
