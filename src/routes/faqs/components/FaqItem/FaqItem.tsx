import { Stack, Text } from "@fluentui/react"
import React from "react"

import type { FaqItemFaqFragment } from "./FaqItem.urqlGraphql.generated"
import { useFaqItemStyles } from "./useFaqItemStyles"

export type FaqItemProps = {
	children?: undefined
	className?: string
	faq: FaqItemFaqFragment
}

const FaqItemComponent: React.FC<FaqItemProps> = ({ className, faq }) => {
	const styles = useFaqItemStyles({
		className,
	})

	return (
		<Stack className={styles.wrapper} tokens={{ childrenGap: 30 }}>
			<Text className={styles.title} variant="xLarge" as="h2">
				{faq.title}
			</Text>

			<Text className={styles.content} variant="mediumPlus">
				{faq.isHtml ? (
					<span
						className={styles.content}
						dangerouslySetInnerHTML={faq.content ? { __html: faq.content } : undefined}
					/>
				) : (
					faq.content
				)}
			</Text>
		</Stack>
	)
}

export const FaqItem = React.memo(FaqItemComponent)
