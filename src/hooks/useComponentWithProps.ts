import { makeVar, useReactiveVar } from "@apollo/client";
import React from "react";

import { useRefWithInitializer } from "./useRefWithInitializer";

export function useComponentWithProps<TAllProps extends {}, TDepProps extends keyof TAllProps>(
	render: (props: TAllProps) => React.ReactElement | null,
	props: { [K in TDepProps]-?: TAllProps[K] }
): React.FC<Omit<TAllProps, TDepProps>> {
	const renderRef = React.useRef(render);
	renderRef.current = render;

	const propsVar = useRefWithInitializer(() => makeVar(props)).current;

	React.useEffect(() => {
		propsVar(props);
	}, Object.values(props));

	return useRefWithInitializer<React.FC<Omit<TAllProps, TDepProps>>>(() => (props) => {
		return renderRef.current({
			...useReactiveVar(propsVar),
			...props,
		} as any);
	}).current;
}
