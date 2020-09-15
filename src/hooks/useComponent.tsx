import { observer, useForceUpdate } from "mobx-react-lite";
import React from "react";

export const useComponent = <TProps extends {}, TDeps extends {} = {}>(
	Component: React.ComponentType<TProps & TDeps>,
	deps: TDeps
): React.FC<TProps> => {
	const depsRef = React.useRef(deps);
	const forceUpdateRef = React.useRef(() => {});

	const [Result] = React.useState(() => {
		const ObserverComponent = observer((props: TProps & TDeps) => <Component {...props} />);

		return (props: TProps) => {
			const forceUpdate = useForceUpdate();

			React.useEffect(() => {
				forceUpdateRef.current = forceUpdate;

				return () => {
					forceUpdateRef.current = () => {};
				};
			}, []);

			return <ObserverComponent {...props} {...depsRef.current} />;
		};
	});

	React.useLayoutEffect(() => {
		depsRef.current = deps;
		forceUpdateRef.current();
	});

	return Result;
};

export const useComponentWithProps = <TComponentProps extends {}, TDepsKeys extends keyof TComponentProps>(
	Component: React.ComponentType<TComponentProps>,
	deps: Pick<TComponentProps, TDepsKeys>
): React.FC<Omit<TComponentProps, TDepsKeys>> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return useComponent(Component as any, deps);
};
