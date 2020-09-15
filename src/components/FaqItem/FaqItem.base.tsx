import { Stack } from "@fluentui/react/lib/Stack";
import { Text } from "@fluentui/react/lib/Text";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import { FaqItemProps, FaqItemStyleProps, FaqItemStyles } from "./FaqItem.types";

const getClassNames = classNamesFunction<FaqItemStyleProps, FaqItemStyles>();

export const FaqItemBase = (props: FaqItemProps) => {
	const { faq } = props;

	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className });

	return (
		<Stack className={classNames.root} tokens={{ childrenGap: 30 }}>
			<Text className={classNames.title} variant="xLarge" as="h2">
				{faq.title}
			</Text>

			<Text className={classNames.content} variant="mediumPlus">
				{faq.isHtml ? (
					<span
						className={classNames.content}
						dangerouslySetInnerHTML={faq.content ? { __html: faq.content } : undefined}
					/>
				) : (
					faq.content
				)}
			</Text>
		</Stack>
	);
};
