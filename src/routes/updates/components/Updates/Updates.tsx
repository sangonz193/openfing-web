import { FocusZone, FocusZoneDirection, List, Separator, Spinner } from "@fluentui/react"
import React from "react"

import { CreativeCommonsFooter } from "../../../../components/CreativeCommonsFooter"
import { UpdateItem } from "../UpdateItem"
import { useUpdatesQuery } from "./Updates.urqlGraphql.generated"
import { useUpdatesStyles } from "./useUpdatesStyles"

const UpdatesComponent: React.FC = () => {
	const styles = useUpdatesStyles()

	const [{ fetching, data }] = useUpdatesQuery()
	const { latestCourseClasses } = data || {}

	const getKey = React.useCallback((obj: { id: string }) => obj.id, [])

	const handleRenderCell = React.useCallback(
		(item?: Exclude<typeof latestCourseClasses, undefined>[number], index?: number) => {
			return item && typeof index === "number" ? (
				<>
					<UpdateItem courseClass={item} />

					{index + 1 !== latestCourseClasses?.length && <Separator className={styles.separator} />}
				</>
			) : null
		},
		[latestCourseClasses, styles.separator]
	)

	return (
		<div className={styles.wrapper} data-is-scrollable>
			<FocusZone direction={FocusZoneDirection.vertical} className={styles.content}>
				{fetching && <Spinner className={styles.spinner} />}

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
	)
}

export const Updates = React.memo(UpdatesComponent)
