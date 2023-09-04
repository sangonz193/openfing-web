import { graphql } from "@/gql"
import type { FaqItemFaqFragment } from "@/gql/graphql"

graphql(/* GraphQL */ `
	fragment FaqItemFaq on Faq {
		id
		title
		content
		isHtml
	}
`)

type Props = {
	faq: FaqItemFaqFragment
}

export function FaqItem(props: Props) {
	const { faq } = props

	return (
		<div className="flex flex-col gap-4 rounded-lg border p-4">
			<h2 className="text-xl font-semibold">{faq.title}</h2>

			<p
				dangerouslySetInnerHTML={faq.isHtml && faq.content ? { __html: faq.content } : undefined}
				className="prose text-base"
			>
				{faq.isHtml && faq.content ? undefined : faq.content}
			</p>
		</div>
	)
}
