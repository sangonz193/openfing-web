import type { FragmentType } from "@/gql"
import { graphql, useFragment } from "@/gql"

const FaqItemFragmentDocument = graphql(/* GraphQL */ `
	fragment FaqItemFragment on Faqs {
		id
		title
		content
		isHtml
	}
`)

type Props = {
	faqFragment: FragmentType<typeof FaqItemFragmentDocument>
}

export function FaqItem(props: Props) {
	const { faqFragment } = props
	const faq = useFragment(FaqItemFragmentDocument, faqFragment)

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
