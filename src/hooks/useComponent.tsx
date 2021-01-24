import React from "react";

export const useComponent = <TProps extends {}, TDeps extends {} = {}>(
	Component: React.FC<TProps & TDeps>,
	deps: TDeps
): React.FC<TProps> => {
	const depsRef = React.useRef(deps);
	const forceUpdateRef = React.useRef(() => {});

	const [Result] = React.useState(() => {
		const MemoComponent = React.memo((props: TProps & TDeps) => <Component {...props} />);

		return (props: TProps) => {
			const [, forceUpdate] = React.useState<{}>();

			React.useEffect(() => {
				forceUpdateRef.current = () => forceUpdate({});

				return () => {
					forceUpdateRef.current = () => {};
				};
			}, []);

			const mergedProps = {
				...props,
				...depsRef.current,
			};

			return <MemoComponent {...(mergedProps as any)} />;
		};
	});

	React.useLayoutEffect(() => {
		depsRef.current = deps;
		forceUpdateRef.current();
	}, Object.values(deps));

	return Result;
};

export const useComponentWithProps = <TComponentProps extends {}, TDepsKeys extends keyof TComponentProps>(
	Component: React.ComponentType<TComponentProps>,
	deps: Pick<TComponentProps, TDepsKeys>
): React.FC<Omit<TComponentProps, TDepsKeys>> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return useComponent(Component as any, deps);
};
