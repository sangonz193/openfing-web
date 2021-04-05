export type RouteConfig<TMatchParams = {}, TGetPathOptions = TMatchParams> = {
	path: {} extends TGetPathOptions ? string : (options: TGetPathOptions) => string
	element: (props: Record<keyof TMatchParams, string>) => React.ReactNode
	matchConfig: {
		path: string
		exact?: boolean
		_matchParams?: TMatchParams
	}
}
