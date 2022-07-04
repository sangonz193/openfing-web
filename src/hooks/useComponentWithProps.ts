import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import { useObservable, useObservableState } from "observable-hooks"
import React from "react"
import { map } from "rxjs/operators"

import { useRefWithInitializer } from "./useRefWithInitializer"

export function useComponentWithProps<TAllProps extends {}, TDepProps extends keyof TAllProps>(
	render: (props: TAllProps) => React.ReactElement | null,
	props: { [K in TDepProps]-?: TAllProps[K] }
): React.FC<Omit<TAllProps, TDepProps>> {
	const propsKeys = React.useMemo(() => dangerousKeysOf(props), [])
	const observableDepProps = useObservable(
		(input) =>
			input.pipe(
				map((value) => {
					const _props: any = {}
					propsKeys.forEach((key, index) => {
						_props[key] = value[index]
					})

					return _props as Pick<TAllProps, TDepProps>
				})
			),
		propsKeys.map((key) => props[key])
	)

	const renderRef = React.useRef(render)
	renderRef.current = render

	return useRefWithInitializer<React.FC<Omit<TAllProps, TDepProps>>>(() => (_props) => {
		const depProps = useObservableState<Pick<TAllProps, TDepProps>>(observableDepProps, props)

		return renderRef.current({
			...depProps,
			..._props,
		} as any)
	}).current
}
