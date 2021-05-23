import React from "react"

import { useDivStyles } from "./useDivStyles"

export type DivProps = React.HTMLAttributes<HTMLDivElement>

const DivComponent: React.FC<DivProps & { divRef?: React.Ref<HTMLDivElement> }> = (props) => {
	const { className, divRef, ...divProps } = props
	const styles = useDivStyles({
		className,
	})

	return <div ref={divRef} {...divProps} className={styles.wrapper} />
}

export const Div = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => <DivComponent {...props} divRef={ref} />)
