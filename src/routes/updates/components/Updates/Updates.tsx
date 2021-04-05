import { FocusZone, FocusZoneDirection, List, Separator, Spinner } from "@fluentui/react";
import React from "react";

import { CreativeCommonsFooter } from "../../../../components/CreativeCommonsFooter";
import { useLayoutOptions } from "../../../../components/Layout/useLayoutOptions";
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { UpdateItem } from "./UpdateItem";
import { useUpdatesQuery } from "./Updates.graphql.generated";
import { useUpdatesStyles } from "./useUpdatesStyles";

export type UpdatesProps = {
	children?: undefined;
	className?: string;
};

const UpdatesComponent: React.FC<UpdatesProps> = ({ className }) => {
	const styles = useUpdatesStyles({
		className,
	});

	useDocumentTitle("Actualizaciones - OpenFING");
	useLayoutOptions({ headerTitle: "Actualizaciones" });

	const { loading, data } = useUpdatesQuery();
	const { latestCourseClasses } = data || {};

	const getKey = React.useCallback((obj: { id: string }) => obj.id, []);

	const handleRenderCell = React.useCallback(
		(item?: Exclude<typeof latestCourseClasses, undefined>[number], index?: number) => {
			return item && typeof index === "number" ? (
				<>
					<UpdateItem courseClass={item} />

					{index + 1 !== latestCourseClasses?.length && <Separator className={styles.separator} />}
				</>
			) : null;
		},
		[latestCourseClasses, styles.separator]
	);

	return (
		<div className={styles.wrapper} data-is-scrollable>
			<FocusZone direction={FocusZoneDirection.vertical} className={styles.content}>
				{loading && <Spinner className={styles.spinner} />}

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

export const Updates = React.memo(UpdatesComponent);
