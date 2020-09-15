import { RouteConfig } from "../routeConfigMap";
import { matchPath, PathMatch } from "./matchPath";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const matchRouteConfig = <T extends RouteConfig<any>>(
	pathname: string,
	routeConfig: T
): PathMatch<Exclude<T["matchConfig"]["_matchParams"], undefined>> | null =>
	matchPath(pathname, {
		path: routeConfig.matchConfig.path,
		exact: routeConfig.matchConfig.exact,
	}) as PathMatch<Exclude<T["matchConfig"]["_matchParams"], undefined>> | null;
