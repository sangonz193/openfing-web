import { FocusZone, FocusZoneDirection, List, Separator, Spinner } from "@fluentui/react"
import React from "react"

import { CreativeCommonsFooter } from "../../../../components/CreativeCommonsFooter"
import { useGoogleAnalyticsPageView } from "../../../../googleAnalytics/useGoogleAnalyticsPageView"
import { useScreenTitle } from "../../../../hooks/useScreenTitle"
import { UpdateItem } from "../UpdateItem"
import { useUpdatesQuery } from "./Updates.urqlGraphql.generated"
import { useUpdatesStyles } from "./useUpdatesStyles"

export type UpdatesProps = {
	children?: undefined
	className?: string
}

const UpdatesComponent: React.FC<UpdatesProps> = ({ className }) => {
	const title = "Actualizaciones"
	useScreenTitle(title)
	useGoogleAnalyticsPageView({ title: title })
	const styles = useUpdatesStyles({
		className,
	})

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
