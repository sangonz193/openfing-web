import { FocusZone, FocusZoneDirection } from "@fluentui/react/lib/FocusZone";
import { List } from "@fluentui/react/lib/List";
import { Separator } from "@fluentui/react/lib/Separator";
import { Spinner } from "@fluentui/react/lib/Spinner";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";
import { CreativeCommonsFooter } from "src/components/CreativeCommonsFooter";
import { UpdateItem } from "src/components/UpdateItem";
import { useDocumentTitle } from "src/hooks/useDocumentTitle";

import { useLayoutOptions } from "../../_utils/useLayoutOptions";
import { useUpdatesQuery } from "./Updates.graphql.generated";
import { UpdatesProps, UpdatesStyleProps, UpdatesStyles } from "./Updates.types";

const getClassNames = classNamesFunction<UpdatesStyleProps, UpdatesStyles>();

export const UpdatesBase = (props: UpdatesProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className });

	useDocumentTitle("Actualizaciones - OpenFING");
	useLayoutOptions(React.useCallback(() => ({ header: { title: "Actualizaciones" } }), []));

	const { loading, data } = useUpdatesQuery();
	const { latestCourseClasses } = data || {};

	const getKey = React.useCallback((obj: { id: string }) => obj.id, []);

	const handleRenderCell = React.useCallback(
		(item?: Exclude<typeof latestCourseClasses, undefined>[number], index?: number) => {
			return item && typeof index === "number" ? (
				<>
					<UpdateItem courseClass={item} />

					{index + 1 !== latestCourseClasses?.length && (
						<Separator styles={classNames.subComponentStyles.separator} />
					)}
				</>
			) : null;
		},
		[latestCourseClasses, classNames.subComponentStyles.separator]
	);

	return (
		<div className={classNames.root} data-is-scrollable>
			<FocusZone direction={FocusZoneDirection.vertical} className={classNames.content}>
				{loading && <Spinner styles={classNames.subComponentStyles.spinner} />}

				<List
					items={latestCourseClasses}
					ignoreScrollingState
					getKey={getKey}
					onRenderCell={handleRenderCell}
					onShouldVirtualize={() => false}
				/>
			</FocusZone>

			<CreativeCommonsFooter />
		</div>
	);
};
