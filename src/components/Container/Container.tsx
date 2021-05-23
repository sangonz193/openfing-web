import React from "react"

import { useDivStyles } from "./useContainerStyles"

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>

const ContainerComponent: React.FC<ContainerProps & { divRef?: React.Ref<HTMLDivElement> }> = (props) => {
	const { className, divRef, ...divProps } = props
	const styles = useDivStyles({
		className,
	})

	return <div ref={divRef} {...divProps} className={styles.wrapper} />
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>((props, ref) => (
	<ContainerComponent {...props} divRef={ref} />
))
