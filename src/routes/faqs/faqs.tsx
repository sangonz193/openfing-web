import { Loader2 as Loader2Icon } from "lucide-react"
import { Fragment } from "react"
import { useQuery } from "urql"

import { CreativeCommonsFooter } from "@/components/CreativeCommonsFooter"
import { useGoogleAnalyticsPageView } from "@/googleAnalytics/useGoogleAnalyticsPageView"
import { graphql } from "@/gql"
import { useScreenTitle } from "@/hooks/useScreenTitle"

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
	const title = "FAQs"
	useScreenTitle(title)
	useGoogleAnalyticsPageView({ title: title })

	const [{ fetching, data }] = useQuery({ query: FaqsQueryDocument })

	return (
		<div className="flex grow flex-col overflow-auto">
			<div className="mx-auto flex min-h-full max-w-2xl shrink-0 flex-col gap-8 py-10">
				{fetching ? (
					<Loader2Icon className="mx-auto mt-10 h-10 w-10 animate-spin text-primary" />
				) : (
					data?.faqsCollection?.edges.map(({ node }) => (
						<Fragment key={node.id}>
							{node.id !== data.faqsCollection?.edges[0].node.id && <hr className="border-border" />}
							<FaqItem faqFragment={node} />
						</Fragment>
					))
				)}
			</div>

			<CreativeCommonsFooter />
		</div>
	)
}