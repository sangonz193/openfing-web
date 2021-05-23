import React from "react"

import { useContainerStyles } from "./useContainerStyles"

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>

// TODO: delete

const ContainerComponent: React.FC<ContainerProps & { divRef?: React.Ref<HTMLDivElement> }> = (props) => {
	const { className, divRef, ...divProps } = props
	const styles = useContainerStyles({
		className,
	})

	return <div ref={divRef} {...divProps} className={styles.wrapper} />
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>((props, ref) => (
	<ContainerComponent {...props} divRef={ref} />
))
