import { format } from "date-fns"
import es from "date-fns/locale/es"
import React from "react"

import { usePostTimestampStyles } from "./usePostTimestampStyles"

export type PostTimestampProps = {
	children?: undefined
	className?: string
	date: Date
}

export const PostTimestamp: React.FC<PostTimestampProps> = ({ className, date }) => {
	const styles = usePostTimestampStyles({
		className,
	})

	const formattedText = React.useMemo(() => format(date, "PPP", { locale: es }), [date])

	return <div className={styles.wrapper}>{formattedText}</div>
}
