import { FocusZone, FocusZoneDirection, List, Separator, Spinner } from "@fluentui/react"
import React from "react"

import { CreativeCommonsFooter } from "../../../../components/CreativeCommonsFooter"
import { useScreenTitle } from "../../../../hooks/useScreenTitle"
import { UpdateItem } from "../UpdateItem"
import { useUpdatesQuery } from "./Updates.graphql.generated"
import { useUpdatesStyles } from "./useUpdatesStyles"

export type UpdatesProps = {
	children?: undefined
	className?: string
}

const UpdatesComponent: React.FC<UpdatesProps> = ({ className }) => {
	useScreenTitle("Actualizaciones")
	const styles = useUpdatesStyles({
		className,
	})

	const { loading, data } = useUpdatesQuery()
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
	)
}

export const Updates = React.memo(UpdatesComponent)
