import { List, Separator, Spinner } from "@fluentui/react"
import React from "react"

import { CreativeCommonsFooter } from "../../../../components/CreativeCommonsFooter"
import { useScreenTitle } from "../../../../hooks/useScreenTitle"
import { useGoogleAnalyticsPageView } from "../../../../modules/GoogleAnalytics/useGoogleAnalyticsPageView"
import { FaqItem } from "../FaqItem/FaqItem"
import { useFaqsQuery } from "./Faqs.urqlGraphql.generated"
import { useFaqsStyles } from "./useFaqsStyles"

export type FaqsProps = {
	children?: undefined
	className?: string
}

const FaqsComponent: React.FC<FaqsProps> = ({ className }) => {
	const title = "FAQs"
	useScreenTitle(title)
	useGoogleAnalyticsPageView({ title: title })
	const styles = useFaqsStyles({
		className,
	})

	const [{ fetching, data }] = useFaqsQuery()
	const { faqs } = data || {}

	const getKey = React.useCallback((obj: { id: string }) => obj.id, [])

	const handleRenderCell = React.useCallback(
		(item?: Exclude<typeof faqs, undefined>[number], index?: number) => {
			return item && typeof index === "number" ? (
				<>
					<FaqItem faq={item} />

					{index + 1 !== faqs?.length && <Separator className={styles.separator} />}
				</>
			) : null
		},
		[faqs, styles.separator]
	)

	return (
		<div className={styles.wrapper} data-is-scrollable>
			<div className={styles.content}>
				{fetching && <Spinner className={styles.spinnerRoot} />}

				<List
					items={faqs}
					ignoreScrollingState
					getKey={getKey}
					onRenderCell={handleRenderCell}
					onShouldVirtualize={() => false}
				/>
			</div>

			<CreativeCommonsFooter />
		</div>
	)
}

export const Faqs = React.memo(FaqsComponent)
