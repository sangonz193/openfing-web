import { List } from "@fluentui/react/lib/List";
import { Separator } from "@fluentui/react/lib/Separator";
import { Spinner } from "@fluentui/react/lib/Spinner";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";
import { CreativeCommonsFooter } from "src/components/CreativeCommonsFooter";
import { FaqItem } from "src/components/FaqItem";
import { useDocumentTitle } from "src/hooks/useDocumentTitle";

import { useLayoutOptions } from "../../_utils/useLayoutOptions";
import { useFaqsQuery } from "./Faqs.graphql.generated";
import { FaqsProps, FaqsStyleProps, FaqsStyles } from "./Faqs.types";

const getClassNames = classNamesFunction<FaqsStyleProps, FaqsStyles>();

export const FaqsBase = (props: FaqsProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme });

	useDocumentTitle("FAQs - OpenFING");
	useLayoutOptions(React.useCallback(() => ({ header: { title: "FAQs" } }), []));

	const { loading, data } = useFaqsQuery();
	const { faqs } = data || {};

	const getKey = React.useCallback((obj: { id: string }) => obj.id, []);

	const handleRenderCell = React.useCallback(
		(item?: Exclude<typeof faqs, undefined>[number], index?: number) => {
			return item && typeof index === "number" ? (
				<>
					<FaqItem faq={item} />

					{index + 1 !== faqs?.length && <Separator styles={classNames.subComponentStyles.separator} />}
				</>
			) : null;
		},
		[faqs, classNames.subComponentStyles.separator]
	);

	return (
		<div className={classNames.root} data-is-scrollable>
			<div className={classNames.content}>
				{loading && <Spinner styles={classNames.subComponentStyles.spinner} />}

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
	);
};
